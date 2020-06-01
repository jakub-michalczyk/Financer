import React from 'react';
import Menu from './Menu';
import Box from './Box';
import Edit from './Edit';
import Calendar from './Calendar';
import Balance from './Balance';
import Settings from './Settings';
import Overlayer from './Overlayer';
import FinanceBox from './FinanceBox';
import ButtonBox from './ButtonBox';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      editedFnc: {},
      editOn: true,
      fncForm: 0,
      newCategory: { icon: "./images/addedIcon.png" },
      currentMonth: new Date().getMonth(),
      calendarOn: false,
      calculateCurrency: "PLN",
      settingsHidden: true,
      fncID: 0,
      finBalance: 0,
      needInfo: false,
      newFinanceAction: {},
      incomes: [],
      expenses: [],
      boxHidden: true,
      action: null,
      hide: {
        income: false,
        expenses: false
      },
      categories: [
        [
          //Income
          "przychód",
          {
            name: "Wybierz kategorię",
            icon: "./#"
          },
          {
            name: "Wypłata",
            icon: "./images/money.png"
          },
          {
            name: "Darowizna",
            icon: "./images/donation.png"
          }
        ],
        [
          //Expenses
          "wydatek",
          {
            name: "Wybierz kategorię",
            icon: "./#"
          },
          {
            name: "Opłacenie mieszkania",
            icon: "./images/house.png"
          },
          {
            name: "Jedzenie",
            icon: "./images/chicken.png"
          },
          {
            name: "Internet",
            icon: "./images/internet.png"
          }
        ]
      ]
    }

    this.closeEditBox = this.closeEditBox.bind(this);
    this.changeCalculationCurrency = this.changeCalculationCurrency.bind(this);
    this.changeCurrentMonth = this.changeCurrentMonth.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
    this.updateFinance = this.updateFinance.bind(this);
    this.editFinance = this.editFinance.bind(this);
    this.removeFinance = this.removeFinance.bind(this);
    this.saveNewCategory = this.saveNewCategory.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
    this.chooseFncForm = this.chooseFncForm.bind(this);
    this.calendarOn = this.calendarOn.bind(this);
    this.changeSettingsStatus = this.changeSettingsStatus.bind(this);
    this.calculateBalance = this.calculateBalance.bind(this);
    this.hideTable = this.hideTable.bind(this);
    this.showBox = this.showBox.bind(this);
    this.addFinanceAction = this.addFinanceAction.bind(this);
    this.addNewFncActionData = this.addNewFncActionData.bind(this);
  }

  async componentDidMount() {
    let getStates = ["calculateCurrency", "fncID", "incomes", "expenses", "categories"];
    let states = [];

    await getStates.forEach(storage => {
      if (localStorage.getItem(storage)) {
        states.push(
          {
            name: storage,
            content: JSON.parse(localStorage.getItem(storage))
          }
        );
      }
    });

    for (let i = 0; i < states.length; i++) {
      await this.setState({
        [`${states[i].name}`]: states[i].content
      });
    }

    await this.calculateBalance();
  }

  saveToLocalStorage(name, whatToSave) {
    typeof whatToSave === "object" ? localStorage.setItem(name, JSON.stringify(whatToSave)) : localStorage.setItem(name, whatToSave);
  }

  async addFinanceAction(action) {
    if (this.state.newFinanceAction.name === undefined ||
      this.state.newFinanceAction.desc === undefined ||
      this.state.newFinanceAction.category === undefined ||
      this.state.newFinanceAction.amount === undefined ||
      this.state.newFinanceAction.currency === undefined
    ) {
      this.setState({
        needInfo: true
      });

      return;
    }

    this.showBox(false);
    this.setState({
      needInfo: false,
      newFinanceAction: {}
    });

    if (action === "przychód") {
      await this.setState({
        incomes: [
          ...this.state.incomes,
          { ...this.state.newFinanceAction, id: this.calcID(), month: this.state.currentMonth },
        ]
      }, this.calculateBalance);

      await this.saveToLocalStorage("fncID", this.state.fncID);
    }
    else if (action === "wydatek") {
      await this.setState({
        expenses: [
          ...this.state.expenses,
          { ...this.state.newFinanceAction, id: this.calcID(), month: this.state.currentMonth }
        ]
      }, this.calculateBalance);

      await this.saveToLocalStorage("fncID", this.state.fncID);
    }

    await this.saveToLocalStorage("incomes", this.state.incomes);
    await this.saveToLocalStorage("expenses", this.state.expenses);
  }

  addNewFncActionData(e) {
    this.setState({
      newFinanceAction: { ...this.state.newFinanceAction, [e.target.dataset.name]: e.target.value }
    });
  }

  calcID() {
    this.setState({
      fncID: this.state.fncID + 1
    });

    return this.state.fncID
  }

  hideTable(whatToHide) {
    this.setState({
      hide: {
        [whatToHide]: !this.state.hide[whatToHide]
      }
    });
  }

  showBox(btnID) {
    if (btnID) {
      this.setState({
        action: btnID.props.id === 0 ? "przychód" : "wydatek"
      });
    }
    this.setState({
      boxHidden: !this.state.boxHidden
    });
    this.setState({
      needInfo: false
    });
  }

  async calculateBalance() {
    let localBalance = 0;
    let st = this.state.calculateCurrency;
    
    if(this.state.incomes.length === 0 || this.state.expenses.length === 0){
      this.setState({
        finBalance: localBalance
      });
    }

    await this.state.incomes.forEach(async (inc) => {
      let curr = inc.currency;

      if (curr !== st) {
        //Przewalutowanie

        let data = await fetch(`https://api.exchangeratesapi.io/latest?base=${curr}`);
        let fetched = await data.json();

        (await function () {
          for (const rate in fetched.rates) {
            if (rate === st) {
              localBalance += parseInt(inc.amount) * parseInt(fetched.rates[rate].toFixed(2));
            }
          }
        })();
      }
      else {
        localBalance += parseInt(inc.amount);
      }

      await this.setState({
        finBalance: localBalance
      });
    });

    await this.state.expenses.forEach(async (exp) => {
      let curr = exp.currency;

      if (curr !== st) {
        //Przewalutowanie

        let data = await fetch(`https://api.exchangeratesapi.io/latest?base=${curr}`);
        let fetched = await data.json();

        (await function () {
          for (const rate in fetched.rates) {
            if (rate === st) {
              localBalance -= parseInt(exp.amount) * (parseInt(fetched.rates[rate])).toFixed(2);
            }
          }
        })();
      }
      else {
        localBalance -= parseInt(exp.amount);
      }

      await this.setState({
        finBalance: localBalance
      });
    });
  }

  async removeFinance(e) {
    let parentID = parseInt(e.currentTarget.parentNode.dataset.id);

    await this.state.incomes.forEach(inc => {
      if (inc.id === parentID) {
        this.setState({
          incomes: this.state.incomes.filter(fnc => fnc.id !== parentID)
        });
      }
    });

    await this.state.expenses.forEach(exp => {
      if (exp.id === parentID) {
        this.setState({
          expenses: this.state.expenses.filter(fnc => fnc.id !== parentID)
        });
      }
    });

    await this.saveToLocalStorage("incomes", this.state.incomes);
    await this.saveToLocalStorage("expenses", this.state.expenses);
    await this.calculateBalance();
  }

  editFinance(e) {
    let parentID = parseInt(e.currentTarget.parentNode.dataset.id);

    this.state.incomes.forEach(inc => {
      if (inc.id === parentID) {
        this.setState({
          editedFnc: { ...inc, type: "incomes" }
        });
      }
    });

    this.state.expenses.forEach(exp => {
      if (exp.id === parentID) {
        this.setState({
          editedFnc: { ...exp, type: "expenses" }
        });
      }
    });

    this.setState({
      editOn: !this.state.editOn
    });
  }

  updateFinance(e) {
    this.setState({
      editedFnc: { ...this.state.editedFnc, [e.target.dataset.name]: e.target.value }
    });
  }

  async saveUpdate() {
    await this.setState({
      [this.state.editedFnc.type]: [{ ...this.state.editedFnc, type: undefined }]
    });

    await this.setState({
      editOn: !this.state.editOn
    });

    await this.saveToLocalStorage("incomes", this.state.incomes);
    await this.saveToLocalStorage("expenses", this.state.expenses);
    await this.calculateBalance();
  }

  closeEditBox() {
    this.setState({
      editOn: !this.state.editOn
    });
  }

  changeSettingsStatus() {
    this.setState({
      settingsHidden: !this.state.settingsHidden
    })
  }

  async changeCalculationCurrency(e) {
    await this.setState({
      calculateCurrency: e.target.value
    });

    await this.saveToLocalStorage("calculateCurrency", this.state.calculateCurrency)
  }

  calendarOn() {
    this.setState({
      calendarOn: !this.state.calendarOn
    });
  }

  addNewCategory(e) {
    this.setState({
      newCategory: { ...this.state.newCategory, [e.target.dataset.name]: e.target.value }
    });
  }

  async saveNewCategory() {
    if (parseInt(this.state.fncForm) === 0) {
      await this.setState({
        categories: [[...this.state.categories[0], this.state.newCategory], [...this.state.categories[1]]]
      });
    }
    else if (parseInt(this.state.fncForm) === 1) {
      await this.setState({
        categories: [[...this.state.categories[0]], [...this.state.categories[1]]]
      });
    }

    this.changeSettingsStatus();
    await this.saveToLocalStorage("categories", this.state.categories)
  }

  chooseFncForm(e) {
    this.setState({
      fncForm: e.target.value
    });
  }

  changeCurrentMonth(e) {
    this.setState({
      currentMonth: parseInt(e.currentTarget.dataset.id)
    });
  }

  render() {
    return (
      <div className="App">
        <Menu
          hide={this.hideTable}
          hideTable={this.state.hide}
          settingsStatus={this.changeSettingsStatus}
          calendarSwitch={this.calendarOn}
          calendarStatus={this.state.calendarOn}
        />
        <Calendar
          on={this.state.calendarOn}
          month={this.state.currentMonth}
          changeMonth={this.changeCurrentMonth}
        />
        <Balance val={this.state.finBalance} monthID={this.state.currentMonth} />
        <FinanceBox
          income={this.state.incomes}
          expens={this.state.expenses}
          hideTable={this.state.hide}
          remove={this.removeFinance}
          editFin={this.editFinance}
          fncCategories={this.state.categories}
          month={this.state.currentMonth}
        />
        <ButtonBox boxStatus={this.showBox} />
        <Edit on={this.state.editOn} edit={this.state.editedFnc} update={this.updateFinance} save={this.saveUpdate} closeBox={this.closeEditBox} />
        <Box
          whatToAdd={this.state.action}
          boxStatus={this.state.boxHidden}
          hide={this.showBox}
          income={this.state.incomes}
          expens={this.state.expenses}
          possibleCategories={this.state.categories}
          addFinanceAct={this.addFinanceAction}
          addData={this.addNewFncActionData}
          info={this.state.needInfo}
        />
        <Settings
          settingsStatus={this.state.settingsHidden}
          changeStatus={this.changeSettingsStatus}
          changeCalcCurrency={this.changeCalculationCurrency}
          newCategory={this.addNewCategory}
          save={this.saveNewCategory}
          chooseFncForm={this.chooseFinanceForm}
        />
        <Overlayer boxStatus={this.state.boxHidden} settingsStatus={this.state.settingsHidden} edit={this.state.editOn} />
      </div>
    );
  }
}

export default App;
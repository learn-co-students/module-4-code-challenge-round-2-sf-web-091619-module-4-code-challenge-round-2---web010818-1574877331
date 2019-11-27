import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  constructor() {
    super()
    this.state = {
      allTransactions: transactions,
      search: ''
    }
  }

  componentDidMount() {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
      .then(response => response.json())
      .then(transactionData => 
        this.setState({
        allTransactions: transactionData
      }))
  }

  handleChange = event => {
    this.setState({
      search: event.target.value
    })
  }

  filterTransactions = () => {
    return this.state.allTransactions.filter(transaction => {
      return transaction.category.includes(this.state.search)
    })
  }

  // transaction.category == this.state.search.toLowerCase()

  render() {
    return (
      <div>
        <Search search={this.state.search} onChange={this.handleChange}/>
        <TransactionsList transactions={this.filterTransactions()} />
      </div>
    )
  }
}

export default AccountContainer

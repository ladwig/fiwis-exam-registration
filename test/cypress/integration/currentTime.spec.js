const currentData = new Date()
const time = ('0'+currentData.getHours()).substr(-2) + ":" +('0'+currentData.getMinutes()).substr(-2)
const date = currentData.toLocaleString('de-DE', {weekday: 'long', month: 'short', day: 'numeric'})

describe('Checking screen clock', () => {
  before(() => {

    })

  it('Time is correct at start', () => {
    cy.visit('/')
    expect(cy.contains(time))
  })

  it('Date is correct at start', () => {
    cy.visit('/')
    expect(cy.contains(date))
  })


  //Testing over time
})


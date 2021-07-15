let currentData = null
let time = null
let date = null

describe('Checking screen clock', () => {
  beforeEach(() => {
     currentData = new Date()
     time = ('0'+currentData.getHours()).substr(-2) + ":" +('0'+currentData.getMinutes()).substr(-2)
     date = currentData.toLocaleString('de-DE', {weekday: 'long', month: 'short', day: 'numeric'})
    })

  it('Time is correct at start', () => {
    cy.visit('/')
    expect(cy.contains(time))
  })

  it('Date is correct at start', () => {
    cy.visit('/')
    expect(cy.contains(date))
  })
  // TODO: Testing over longer period of time
})


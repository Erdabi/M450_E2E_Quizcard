describe('create card', () => {
    it('passes', () => {
      cy.visit('http://localhost:9000/')
      cy.get("input[type=question]").type("Eine Frage")
      cy.get("input[type=answer]").type("Eine Antwort")
      cy.get("button[type=save]").click()
    })
  })

describe('Edit cards', () => {
    it('passes', () => {
      cy.visit('http://localhost:9000/')
      cy.get("input[type=question]").type("Eine Frage")
      cy.get("input[type=answer]").type("Eine Antwort")
      cy.get("button[type=save]").click()
      cy.get("button[type=edit]").click()
      cy.get("input[type=question]").type(" edited")
      cy.get("input[type=answer]").type(" edited")
      cy.get("button[type=save]").click()
    })
  })
  
describe('delete cards', () => {
    it('passes', () => {
      cy.visit('http://localhost:9000/')
      cy.get("input[type=question]").type("Eine Frage")
      cy.get("input[type=answer]").type("Eine Antwort")
      cy.get("button[type=save]").click()
      cy.get("button[type=delete]").click()
    })
  })

  describe('show card answer', () => {
    it('passes', () => {
      cy.visit('http://localhost:9000/')
      cy.get("input[type=question]").type("Eine Frage")
      cy.get("input[type=answer]").type("Eine Antwort")
      cy.get("button[type=save]").click()
      cy.get("button[type=show]").click()
    })
  })
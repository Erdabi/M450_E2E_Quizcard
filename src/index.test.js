const { initModel, update } = require("./index.js");


    it('should update question in the model', () => {
      const message = { type: MSG.UPDATE_QUESTION, value: 'New Question' };
      const model = { ...initModel, question: 'Old Question' };
      const updatedModel = update(message, model);
      
      expect(updatedModel.question).toBe('New Question');
    });
  
   
    it('should update answer in the model', () => {
        const message = { type: MSG.UPDATE_ANSWER, value: 'New Answer' };
        const model = { ...initModel, answer: 'Old Answer' };
        const updatedModel = update(message, model);
        
        expect(updatedModel.answer).toBe('New Answer');
      });
  

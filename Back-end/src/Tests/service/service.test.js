const { expect } = require('chai');
const Sinon = require('sinon');
const listModel = require('../../Model');
const listService = require('../../Service');
const { dataDb, bodyCreate } = require('../Mock');


describe('Service', function () {
  describe('#getAll', function () {
    it('Deve retornar um array de obj quando tem dados no banco', async function () {
      Sinon.stub(listModel, 'getAll').resolves(dataDb);
      const data = await listService.getAll();
      expect(data).to.deep.eq(dataDb);
      Sinon.restore();
    });
    it('Sem dados no Db deve retornar um array vazio', async function () {
      Sinon.stub(listModel, 'getAll').resolves([]);
      const data = await listService.getAll();
      expect(data).to.be.empty;
    });
  });

  describe('#Create', function () {
    it('Cadastrando um novo estudante', async function () {
      Sinon.stub(listModel, 'registerStudent').resolves(dataDb[0]);
      const data = await listService.registerStudent(123, 'Alessandro', '432.322.432-59', 'Alessandro@gmail.com');
      expect(data).to.deep.eq(dataDb[0]);
      Sinon.restore();
    });
    it('Tentando cadastrar sem ra, retorna a mensagem "ra field is required."', async function () {
      Sinon.stub(listModel, 'registerStudent').resolves(dataDb[0]);
      const data = await listService.registerStudent(undefined, 'Alessandro', '432.322.432-59', 'Alessandro@gmail.com');

      expect(data.message).to.deep.eq('ra field is required.');
      Sinon.restore();
    });
    it('Tentando cadastrar sem name, retorna a mensagem "name field is required."', async function () {
      Sinon.stub(listModel, 'registerStudent').resolves(dataDb[0]);
      const data = await listService.registerStudent(123, undefined, '432.322.432-59', 'Alessandro@gmail.com');

      expect(data.message).to.deep.eq('name field is required.');
      Sinon.restore();
    });
    it('Tentando cadastrar sem cpf, retorna a mensagem "cpf field is required."', async function () {
      Sinon.stub(listModel, 'registerStudent').resolves(dataDb[0]);
      const data = await listService.registerStudent(123, 'Alessandro', undefined, 'Alessandro@gmail.com');

      expect(data.message).to.deep.eq('cpf field is required.');
      Sinon.restore();
    });
    it('Tentando cadastrar sem email, retorna a mensagem "email field is required."', async function () {
      Sinon.stub(listModel, 'registerStudent').resolves(dataDb[0]);
      const data = await listService.registerStudent(123, 'Alessandro', '432.322.432-59', undefined);

      expect(data.message).to.deep.eq('email field is required.');
      Sinon.restore();
    });
  });
  
});
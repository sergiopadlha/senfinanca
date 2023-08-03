import formatValue from './formatValue'

test('formatValue deverá retornar o valor informado em uma string em formato de moeda Real brasileiro.', () => {
    expect(formatValue(2.50).match('R$ 2,50'))
})
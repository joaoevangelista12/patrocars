import { limpar_tela, limpar_tela_enter, mostrar_texto, obter_numero, obter_numero_positivo, obter_texto } from "../utils/my_utils.js";
import { ulid } from "ulidx";
import fs from 'fs'
export function menu(){
    let opcoes = `\n--------------PATROCARS--------------`
    opcoes += '\n-------------------------------------'
    opcoes += '\n[PRESSIONE 1] => CRIAR MONTADORA'
    opcoes += '\n[PRESSIONE 2] => LISTAR MONTADORAS'
    opcoes += '\n[PRESSIONE 3] => ATUALIZAR MONTADORAS'
    opcoes += '\n[PRESSIONE 4] => REMOVER MONTADORAS'
    opcoes += '\n[PRESSIONE 5] => CONTAR MONTADORAS'
    opcoes += '\n[PRESSIONE 0] => SAIR'
    opcoes += '\n\n>>>> '
    return opcoes
}
export function adicionar_montadora(){
    const id = ulid()
    const nome = obter_texto('Nome: ')
    const pais = obter_texto('Pais: ')
    const ano = obter_texto('Ano: ')

    const montadora = {
        'id': id,
        'nome': nome,
        'pais': pais,
        'ano': ano
    }
    mostrar_texto('Montadora adicionada com sucesso!')
    return montadora
}
export function listar_montadoras_criadas(montadoras){
    mostrar_texto('\n----------MONTADORAS CADASTRADAS----------')
    mostrar_texto('------------------------------------------')
    for(let i of montadoras){
        const montadora = `${i['id']} - ${i['nome']} - ${i['pais']} - ${i['ano']}`
        mostrar_texto(montadora)
    }
    mostrar_texto('------------------------------------------')
}
export function mostrar_frase_bye(){
    let frases = [
      'Ate logo meu bem :)',
      `bye bye, fica bem :)`,
      `ate mais, cuide-se! :)`,
      `Tchau, tenha um dia tao incrivel quanto voce :)`,
      `Ate mais, tenha uma boa semana :)`
    ]
  
    const indice_sorteado = Math.floor(Math.random() * frases.length)
    const frase_sorteada = frases[indice_sorteado]
  
    return frase_sorteada
}
export function remover_montadora(montadoras){
    const index = obter_codigo_montadora(montadoras)

    // Remover a montadora da lista
    montadoras.splice(index - 1, 1)
    mostrar_texto('Montadora removida com sucesso!')
}
export function atualizar_dados_montadora(montadoras){
    console.clear()
    mostrar_texto('\nOBS: Caso nao queira mudar o dado, apenas deixe em branco e pressione enter.')
    limpar_tela_enter()
    const index = obter_codigo_montadora(montadoras)
    const montadora = montadoras
    // substituir dados 
    mostrar_texto('\n---------------Atualizar/Corrigir dados---------------')
    mostrar_texto(`Nome atual: ${montadora[index - 1]['nome']}`)
    montadora[index - 1]['nome'] = obter_texto('Insira o novo nome: ').trim() || montadora[index - 1]['nome']
    mostrar_texto(`Pais atual: ${montadora[index - 1]['pais']}`)
    montadora[index - 1]['pais'] = obter_texto('Insira o novo pais: ').trim() || montadora[index - 1]['pais']
    mostrar_texto(`Ano atual: ${montadora[index - 1]['ano']}`)
    montadora[index - 1]['ano'] = obter_texto('Insira o novo ano: ').trim() || montadora[index - 1]['ano']

    mostrar_texto('Montadora atualizada com sucesso!')    
}
function obter_codigo_montadora(montadoras){
    mostrar_texto('\n MONTADORAS CADASTRADAS')
    mostrar_texto('------------------------------------')
    for (let i = 0; i < montadoras.length; i++){
        const item = montadoras[i]
        const linha = `${i + 1}: ${item['nome']}`
        mostrar_texto(linha)
    }
    mostrar_texto('------------------------------------')

    const codigo = obter_numero('Insira o codigo da montadora: \n>>>> ')

    return codigo
}
export function contar_montadoras(montadoras){
    mostrar_texto(`Existem ${montadoras.length} cadastradas.`)
}
export function menu_modelos(){
    let opcoes = `\n--------------PATROCARS--------------`
    opcoes += '\n-------------------------------------'
    opcoes += '\n[PRESSIONE 1] => CADASTRAR MODELO'
    opcoes += '\n[PRESSIONE 2] => LISTAR MODELOS'
    opcoes += '\n[PRESSIONE 3] => ATUALIZAR MODELOS'
    opcoes += '\n[PRESSIONE 4] => REMOVER MODELOS'
    opcoes += '\n[PRESSIONE 0] => SAIR'
    opcoes += '\n\n>>>> '
    return opcoes
} 
export function cadastrar_modelo(){
    const montadora = dados_montadoras()
    const index = obter_codigo_montadora(montadora)
    const id = ulid()
    const nome = obter_texto('Nome do modelo: ')
    const montadora_escolhida = montadora[index - 1]['nome']
    const modelo = {
       'id': id,
       'nome': nome,
       'montadora_escolhida': montadora_escolhida
    }
    mostrar_texto('Modelo cadastrado com sucesso!')
    return modelo
}
function dados_montadoras(){
    const montadoras = []
    const data = fs.readFileSync('montadoras.txt', 'utf-8')
    const lines = data.split('\n')
      
    for (let line of lines) {
      if (!line) continue
      
      const atributos = line.split('#')
      const montadora = {
        'id': atributos[0],
        'nome': atributos[1],
        'pais': atributos[2],
        'ano': atributos[3]
      }
     montadoras.push(montadora)
    }
      
    return montadoras
}
export function listar_modelos_criados(modelos, listar){
    if(listar === 1){
        mostrar_texto('\n----------MODELOS CADASTRADOS----------')
        mostrar_texto('------------------------------------------')
        for(let i of modelos){
            const modelo = `${i['id']} - ${i['nome']} - ${i['montadora_escolhida']}`
            mostrar_texto(modelo)
        }
        mostrar_texto('------------------------------------------')
    }else{
        const models = []
        const montadora = dados_montadoras()
        const index = obter_codigo_montadora(montadora)
        const modelos_filtrados = modelos.filter(x => x['montadora_escolhida'] === montadora[index - 1]['nome'] )
        models.push(...modelos_filtrados)
        mostrar_texto('\n----------MODELOS CADASTRADOS----------')
        mostrar_texto('------------------------------------------')
        for(let modelo of models){
            const m = `${modelo['id']} - ${modelo['nome']} - ${modelo['montadora_escolhida']}`
            mostrar_texto(m)
        }
        mostrar_texto('------------------------------------------')
    }
}
export function remover_modelos(modelos){
    const index = obter_codigo_modelo(modelos)

    // Remover a montadora da lista
    modelos.splice(index - 1, 1)
    mostrar_texto('Modelo de veiculo removido com sucesso!')
}
function obter_codigo_modelo(modelos){
    mostrar_texto('\n**********MODELOS CADASTRADOS**********')
    mostrar_texto('------------------------------------')
    for (let i = 0; i < modelos.length; i++){
        const item = modelos[i]
        const linha = `${i + 1}: ${item['nome']}`
        mostrar_texto(linha)
    }
    mostrar_texto('------------------------------------')

    const codigo = obter_numero('Insira o codigo do modelo: \n>>>> ')

    return codigo
}
export function atualizar_modelos(modelos){
    limpar_tela()
    mostrar_texto('\nOBS: Caso nao queira mudar o dado, apenas deixe em branco e pressione enter.')
    limpar_tela_enter()
    const index = obter_codigo_modelo(modelos)
    const modelo = modelos
    // substituir dados 
    mostrar_texto('\n---------------Atualizar/Corrigir dados---------------')
    mostrar_texto(`Nome atual: ${modelo[index - 1]['nome']}`)
    modelo[index - 1]['nome'] = obter_texto('Insira o novo nome: ').trim() || modelo[index - 1]['nome']
    mostrar_texto('Modelo atualizado com sucesso!')
}
export function menu_veiculos(){
    let opcoes = `\n--------------PATROCARS--------------`
    opcoes += '\n-------------------------------------'
    opcoes += '\n[PRESSIONE 1] => CADASTRAR VEICULO'
    opcoes += '\n[PRESSIONE 2] => LISTAR VEICULOS'
    opcoes += '\n[PRESSIONE 3] => EDITAR/REMOVER VEICULOS'
    opcoes += '\n[PRESSIONE 4] => VENDER VEICULO'
    opcoes += '\n[PRESSIONE 0] => SAIR'
    opcoes += '\n\n>>>> '
    return opcoes
}
export function cadastrar_veiculo(){
    const montadora = dados_montadoras()
    const index_montadora = obter_codigo_montadora(montadora)
    const model = dados_modelos()
    const modelos_filtrados = model.filter(x => x['montadora_escolhida'] === montadora[index_montadora - 1]['nome'] )
    const index_modelo = obter_codigo_modelo(modelos_filtrados)
    
    const id = ulid()
    const modelo = modelos_filtrados[index_modelo - 1]['nome']
    const cor = obter_texto('Cor: ')
    const ano_fabricacao = obter_numero_positivo('Ano de fabricacao: ')
    const ano_modelo = obter_numero_positivo('Ano do modelo: ')
    const valor = obter_numero_positivo('Valor: ')
    const placa = obter_texto('Placa: ')
    const vendido = obter_numero_positivo('Ja foi vendido? \n1 -> SIM \n2 -> NAO \n>>>> ')
    const veiculos = {
        'id': id,
        'modelo': modelo,
        'cor': cor,
        'ano_fabricacao': ano_fabricacao,
        'ano_modelo': ano_modelo,
        'valor': valor,
        'placa': placa,
        'vendido': vendido === 1 ? true : false
    }
    
    mostrar_texto('Veiculo adicionado com sucesso!')
    return veiculos

}
function dados_modelos(){
    const modelos = []
    const data = fs.readFileSync('modelos.txt', 'utf-8')
    const lines = data.split('\n')

    for (let line of lines){

        if (!line) continue

        const atributos = line.split('#')
        const modelo ={'id': atributos[0],
                            'nome': atributos[1],
                            'montadora_escolhida': atributos[2]
                        }
        modelos.push(modelo)
    }
    return modelos
}
export function listar_veiculos(veiculos, listar){
    if(listar === 1){
        mostrar_texto('\n----------VEICULOS CADASTRADOS----------')
        mostrar_texto('------------------------------------------')
        for(let i of veiculos){
            const veiculo = `${i['id']} - ${i['modelo']} - ${i['cor']} - ${i['ano_fabricacao']} - ${i['ano_modelo']} - ${i['valor']} - ${i['placa']} - ${i['vendido']}`
            mostrar_texto(veiculo)
        }
        mostrar_texto('------------------------------------------')
    }else{
        const veiculs = []
        const modelo = dados_modelos()
        const index = obter_codigo_modelo(modelo)
        const modelos_filtrados = veiculos.filter(x => x['modelo'] === modelo[index - 1]['nome'] )
        veiculs.push(...modelos_filtrados)
        mostrar_texto('\n----------VEICULOS CADASTRADOS----------')
        mostrar_texto('------------------------------------------')
        for(let i of veiculs){
            const v = `${i['id']} - ${i['modelo']} - ${i['cor']} - ${i['ano_fabricacao']} - ${i['ano_modelo']} - ${i['valor']} - ${i['placa']} - ${i['vendido']}`
            mostrar_texto(v)
        }
        mostrar_texto('------------------------------------------')
    }
}
export function editar_remover_veiculo(veiculos, edit_remove){
    if(edit_remove === 1){// Editar
        limpar_tela()
        mostrar_texto('\n\nOBS: Caso nao queira mudar o dado, apenas deixe em branco e pressione enter.')
        limpar_tela_enter()
        const index = obter_codigo_veiculo(veiculos)
        const veiculs = veiculos
        // substituir dados 
        mostrar_texto('\n---------------Atualizar/Corrigir dados---------------')
        mostrar_texto(`Cor atual: ${veiculs[index - 1]['cor']}`)
        veiculs[index - 1]['cor'] = obter_texto('Insira a nova cor: ').trim() || veiculs[index - 1]['cor']
        mostrar_texto(`Ano de fabricacao atual: ${veiculs[index - 1]['ano_fabricacao']}`)
        veiculs[index - 1]['ano_fabricacao'] = obter_texto('Insira o novo ano: ').trim() || veiculs[index - 1]['ano_fabricacao']
        mostrar_texto(`Ano de modelo atual: ${veiculs[index - 1]['ano_modelo']}`)
        veiculs[index - 1]['ano_modelo'] = obter_texto('Insira o novo ano: ').trim() || veiculs[index - 1]['ano_modelo']
        mostrar_texto(`Valor atual: R$${veiculs[index - 1]['valor']}`)
        veiculs[index - 1]['valor'] = obter_texto('Insira o novo valor: ').trim() || veiculs[index - 1]['valor']
        mostrar_texto(`Placa atual: ${veiculs[index - 1]['placa']}`)
        veiculs[index - 1]['placa'] = obter_texto('Insira a nova placa: ').trim() || veiculs[index - 1]['placa']

        mostrar_texto('Veiculo atualizado com sucesso!')
    }else if(edit_remove === 2){// Remover
        limpar_tela()
        const index = obter_codigo_veiculo(veiculos)

    // Remover modelo da lista
    veiculos.splice(index - 1, 1)
    mostrar_texto('Veiculo removido com sucesso!')
    }else{
        return
    }
}
function obter_codigo_veiculo(veiculos){
    mostrar_texto('\n**********VEICULOS CADASTRADOS**********')
    mostrar_texto('------------------------------------')
    for (let i = 0; i < veiculos.length; i++){
        const item = veiculos[i]
        const linha = `${i + 1}: ${item['modelo']} - ${item['placa']}`
        mostrar_texto(linha)
    }
    mostrar_texto('------------------------------------')

    const codigo = obter_numero('Insira o codigo do VEICULO: \n>>>> ')

    return codigo
}
export function vender_veiculo(veiculos){
    limpar_tela()
    mostrar_texto('\nQual veiculo voce vai vender? ')
    const index = obter_codigo_veiculo(veiculos)

    const vender = veiculos
    vender[index - 1]['vendido'] = true
    mostrar_texto('Veiculo vendido com sucesso!')
}
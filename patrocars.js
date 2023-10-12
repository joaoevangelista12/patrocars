import fs from 'fs'
import { limpar_tela, limpar_tela_enter, mostrar_texto, obter_numero, obter_numero_positivo, obter_texto } from "../utils/my_utils.js";
import { adicionar_montadora, atualizar_dados_montadora, atualizar_modelos, cadastrar_modelo, cadastrar_veiculo, contar_montadoras, editar_remover_veiculo, listar_modelos_criados, listar_montadoras_criadas, listar_veiculos, menu_modelos, menu as menu_montadoras, menu_veiculos, mostrar_frase_bye, remover_modelos, remover_montadora, vender_veiculo } from "./patrocars_features.js";

function main(){
    console.clear()
    mostrar_texto('\n---------------PATROCARS---------------')
    let tipo = obter_numero('\nVoce esta buscando:\n 1 -> Montadoras\n 2 -> Modelos\n 3 -> Veiculos\n 0 -> Sair\n\n>>>> ')
    
    while(tipo !== 0){
        const montadoras = []
        const modelos = []
        const veiculos = []

        // MONTADORAS
        if(tipo === 1){
            const inicializar = puxar_dados_montadoras(montadoras)
            let escolha = obter_numero(menu_montadoras())

                while(escolha !== 0){
                if(escolha == 1){
                    const nova_montadora = adicionar_montadora()
                    montadoras.push(nova_montadora)
                }else if(escolha == 2){
                    console.clear()
                    limpar_tela()
                    listar_montadoras_criadas(montadoras)
                }else if(escolha == 3){
                    atualizar_dados_montadora(montadoras)
                }else if(escolha == 4){
                    remover_montadora(montadoras)
                }else if(escolha == 5){
                    contar_montadoras(montadoras)
                }

                // Repetir ciclo
                limpar_tela_enter()
                escolha = obter_numero(menu_montadoras())
                gravar_dados_montadoras(montadoras)
                }


        // MODELOS
        }else if(tipo === 2){
            const inicializar = puxar_dados_modelos(modelos)
            let escolha = obter_numero(menu_modelos())

            while(escolha !== 0){
                if(escolha == 1){
                    const novo_modelo = cadastrar_modelo(montadoras)
                    modelos.push(novo_modelo)
                }else if(escolha == 2){
                    const listar = obter_numero_positivo('1 -> Listar todos. \n2 -> Listar modelo de montadora especifica. \n\n>>>> ')
                    listar_modelos_criados(modelos, listar)
                }else if(escolha == 4){
                    remover_modelos(modelos)
                }else if(escolha == 3){
                    atualizar_modelos(modelos)
                }
                // Repetir ciclo
                limpar_tela_enter()
                escolha = obter_numero(menu_modelos())
                gravar_dados_modelos(modelos)
            }


        // VEICULOS
        }else if(tipo === 3){
            const inicializar = puxar_dados_veiculos(veiculos)
            let escolha = obter_numero(menu_veiculos())
            while(escolha !== 0){
                if(escolha == 1){
                    const novo_veiculo = cadastrar_veiculo()
                    veiculos.push(novo_veiculo)
                }else if(escolha == 2){
                    const listar = obter_numero_positivo('1 -> Listar todos. \n2 -> Listar veiculo de modelo especifico. \n\n>>>> ')
                    listar_veiculos(veiculos, listar)
                }else if(escolha == 3){
                    const edit_remove = obter_numero_positivo('1 -> Editar dados veiculos. \n2 -> Remover veiculo. \n\n>>>> ')
                    editar_remover_veiculo(veiculos, edit_remove)
                }else if(escolha == 4){
                    vender_veiculo(veiculos)
                }

                // Repetir ciclo
                limpar_tela_enter()
                escolha = obter_numero(menu_veiculos())
                gravar_dados_veiculos(veiculos)

            }
        }
        tipo = obter_numero('\nVoce esta buscando:\n 1 -> Montadoras\n 2 -> Modelos\n 3 -> Veiculos\n 0 -> Sair\n\n>>>> ')
    }
    mostrar_texto(`\n${mostrar_frase_bye()}`)
}

// MONTADORAS

function puxar_dados_montadoras(montadoras){
    const data = fs.readFileSync('montadoras.txt', 'utf-8')
    const lines = data.split('\n')

    for (let line of lines){

        if (!line) continue

        const atributos = line.split('#')
        const montadora = {'id': atributos[0],
                            'nome': atributos[1],
                            'pais': atributos[2],
                            'ano': atributos[3]}
        montadoras.push(montadora)
    }
    return montadoras
}
function gravar_dados_montadoras(montadoras){
    let data = ''
    for (let m of montadoras){
        data += `${m['id']}#${m['nome']}#${m['pais']}#${m['ano']}\n`
    }

    fs.writeFileSync('montadoras.txt', data)
}

// MODELOS

function puxar_dados_modelos(modelos){
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
function gravar_dados_modelos(modelos){
    let data = ''
    for (let m of modelos){
        data += `${m['id']}#${m['nome']}#${m['montadora_escolhida']}\n`
    }

    fs.writeFileSync('modelos.txt', data)
}

// VEICULOS

function puxar_dados_veiculos(veiculos){
    const data = fs.readFileSync('veiculos.txt', 'utf-8')
    const lines = data.split('\n')

    for (let line of lines){

        if (!line) continue

        const atributos = line.split('#')
        const veiculo ={'id': atributos[0],
                        'modelo': atributos[1],
                        'cor': atributos[2],
                        'ano_fabricacao': atributos[3],
                        'ano_modelo': atributos[4],
                        'valor': atributos[5],
                        'placa': atributos[6],
                        'vendido': atributos[7]
                        }
        veiculos.push(veiculo)
    }
    return veiculos
}

function gravar_dados_veiculos(veiculos){
    let data = ''
    for (let v of veiculos){
        data += `${v['id']}#${v['modelo']}#${v['cor']}#${v['ano_fabricacao']}#${v['ano_modelo']}#${v['valor']}#${v['placa']}#${v['vendido']}\n`
    }

    fs.writeFileSync('veiculos.txt', data)
}

main()
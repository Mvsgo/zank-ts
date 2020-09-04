import axios from 'axios';
import cheerio from 'cheerio';
import React, { useEffect, useState } from 'react';

export interface ITabela {
  nome: string;
  posicao: string;
  numero: string;
}

const Scrap = () => {
  const [tabela, setTabela] = useState<ITabela[]>([]);

  const url = 'https://globoesporte.globo.com/rj/futebol/campeonato-carioca/';

  useEffect(() => {
    axios(url)
      .then((response) => {
        console.log('aqui inico');
        const html = response.data;
        const $ = cheerio.load(html);
        const tabelaStatus = $('.ranking-item-wrapper');
        let tabelaJogador: ITabela[];

        console.log('aqui esta');

        tabelaStatus.each(function () {
          //$(html).find()
          const nomeJogador = $(html).find('.jogador-nome').text();
          const posicaoJogador = $(html).find('.jogador-posicao').text();
          const numeroGols = $(html).find('.jogador-gols').text();
          //const timeJogador = $(html).find('.jogador-escudo > img').attr('alt');
          //setTabela({ nome: nomeJogador, posicao: posicaoJogador, numero: numeroGols, time: timeJogador });

          tabelaJogador.push({ nome: nomeJogador, posicao: posicaoJogador, numero: numeroGols });
          console.log(tabelaJogador);
          
        });
      })
      .catch(
        console.log('aqui erro');
        console.error;
        ));
  }, []);

  return <div>loading...</div>;
};

export default Scrap;

import axios from 'axios';
import cheerio from 'cheerio';
import React, { useEffect, useState } from 'react';
import api from 'src/api';

import scrapSteam from './scraper';

//import puppeteer from 'puppeteer';
//const puppeteer = require('puppeteer');

export interface ITabela {
  nome: string;
  posicao: string;
  numero: string;
}

const Scrap = () => {
  //const [tabela, setTabela] = useState<ITabela[]>([]);

  useEffect(() => {
    console.log('aqui inico');
    Pega();
  }, []);

  const Pega = async () => {
    //const result = await scrapSteam();
    //console.log('sera = ', result);

    //https://globoesporte.globo.com/rj/futebol/campeonato-carioca/
    axios
      .get('https://google.com.br', {
        proxy: {
          host: '192.168.0.73',
          port: 2138,
        },
      })
      .then((response) => {
        console.log('aqui inico');
        const html = response.data;
        const $ = cheerio.load(html);
        const tabelaStatus = $('.ranking-item-wrapper');
        let tabelaJogador: ITabela[];

        console.log(html);
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
      .catch((err) => {
        console.log(err);
      });
  };

  return <div>loading...</div>;
};

export default Scrap;

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const categories = {
  Utilities: '#edb879',
  'Technology Services': '#1979a9',
  Transportation: '#e07b39',
  'Retail Trade': '#80391e',
  'Producer Manufacturing': '#042f66',
  'Health Technology': '#042f66',
  'Health Services': '#521799',
  Finance: '#991717',
  'Energy Minerals': '#805C33',
  'Electronic Technology': '#003A52',
  'Consumer Services': '#008580',
  'Consumer Non-Durables': '#D1C400',
  'Consumer Durables': '#850200',
  Communications: '#001FD1',
};

const companyCellRenderer = (params) => {
  const { value } = params;
  const split = value.split('|');

  return `
    <div class="app-row app-row--center overflow-hidden">
      <div class="app-symbol app-symbol--default mr-2 rounded">
        <div class="app-symbol__label w-6 h-6 app-color-info font-bold ">${split[0][0]}${split[0][1]}</div>
      </div>
      <div>
        <div class="app-expressive-heading-01">${split[0]}</div>
        <div class="text-overflow-ellipsis app-caption-01">${split[1]}</div>
      </div>
    </div>
  `;
};

const sectorCellRenderer = (params) => {
  const { value } = params;
  const color = categories[value];

  return `
    <div class="flex">
    <div style="width:4px;height:16px;background: ${color};margin-right:5px;"></div>
      ${value}
    </div>
  `;
};

const numberCellRenderer = function (params) {
  const value = params.value;
  const sign = value.charAt(0);

  if (isNaN(sign)) {
    return `
    <span class="app-color-danger">${value}</span>
  `;
  }
  return `
    <span class="app-color-success">${value}</span>
  `;
};

const rateClassRenderer = (params) => {
  const value = params.value;
  return value === 'Strong Sell'
    ? { backgroundColor: 'rgba(255, 212, 219, 1)' }
    : value === 'Sell'
    ? { backgroundColor: 'rgba(255, 212, 219, .5)' }
    : value === 'Strong Buy'
    ? { backgroundColor: 'rgba(227, 255, 223, 1)' }
    : { backgroundColor: 'rgba(227, 255, 223, .5)' };
};

const createRowHelper = (_1, _2, _3, _4, _5, _6, _7, _8, _9) => {
  return {
    company: _1,
    last: _2,
    chg_: _3,
    chg: _4,
    rating: _5,
    vol: _6,
    mkt_cap: _7,
    employees: _8,
    sector: _9,
  };
};

const parseCSV = (csv) => {
  return csv
    .split('\n')
    .map((row) => row.split(','))
    .filter((row) => row[0]);
};

@Component({
  selector: 'app-table-full',
  templateUrl: './table-full.component.html',
  styleUrls: ['./table-full.component.css'],
})
export class TableFullComponent implements OnInit {
  public loading: boolean = false;
  public defaultColDef = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.createTable();
  }

  createTable() {
    this.loading = true;

    this.http
      .get('assets/data/stocks.csv', { responseType: 'text' })
      .subscribe((response) => {
        const rowData = parseCSV(response).map((row) =>
          createRowHelper(
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[5],
            row[6],
            row[9],
            row[10]
          )
        );

        this.loading = false;
      });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import Chart from 'chart.js/auto';
import { monthGenerator, rangeGenerator } from '../../utils/monthGenerator';
import { SalesService } from '../../services/sales.service';
import { catchError } from 'rxjs';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { yearsGenerator } from '../../utils/yearsGenerator';
import { dataPopulator } from '../../utils/populateChartData';

type SalesData = {
  date: string;
  sales: number;
};

@Component({
  selector: 'app-chart',
  imports: [FontAwesomeModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  public chart: any;

  salesService = inject(SalesService);

  month = signal<string>('');
  sales = signal<Array<number>>([]);
  tempArray: Array<string> = [];
  date = signal<number>(0);
  currentYear = new Date().getFullYear();
  isDropdownVisible = signal(false);
  years = yearsGenerator(5);

  createChart() {
    if (this.chart) this.chart.destroy();

    console.log(rangeGenerator(this.month()).length);

    console.log(
      dataPopulator(rangeGenerator(this.month()).length, this.sales())
    );

    this.chart = new Chart('MyChart', {
      type: 'line',

      data: {
        labels: rangeGenerator(this.month()),
        datasets: [
          {
            label: 'Sales',
            data: dataPopulator(
              rangeGenerator(this.month()).length,
              this.sales()
            ),
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            borderColor: 'orange',
            borderJoinStyle: 'round',
            pointRadius: 4,
            pointBackgroundColor: 'orange',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          intersect: true,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              color: 'rgba(200, 200, 200)',
            },
          },
        },
      },
    });
  }

  fetchSales() {
    this.salesService
      .handleFetch()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response.sales);

          const sales: SalesData[] = Object.values(
            response.sales.reduce((acc, sale) => {
              const date = new Date(sale.salesDate).toLocaleDateString();
              if (!acc[date]) {
                acc[date] = {
                  date: new Date(sale.salesDate).toLocaleDateString('en-GB'),
                  sales: 0,
                };
              }
              acc[date].sales += Number(sale.totalPrice);
              return acc;
            }, {} as Record<string, SalesData>)
          );

          console.log('sales:', sales);

          const actualSales: number[] = Object.values(
            sales.reduce((acc, sale) => {
              if (!acc[sale.date.split('/')[1]]) {
                acc[sale.date.split('/')[1]] = 0;
              }
              acc[sale.date.split('/')[1]] += sale.sales;
              return acc;
            }, {} as any)
          );

          this.sales.set(actualSales);

          response.sales.forEach((sale) => {
            this.tempArray.push(sale.salesDate);
          });
          let formattedDate = this.tempArray.map((date) => {
            return new Date(date)
              .toLocaleDateString('en-GB')
              .split('/')[1]
              .split('')[1];
          });
          this.date.set(Math.max(...formattedDate.map(Number)));
          this.month.set(monthGenerator(this.date()));

          this.createChart();
        },

        error: (error) => {
          console.log(error);
        },
      });
  }

  toggleYearDropdown() {
    this.isDropdownVisible.set(!this.isDropdownVisible());
  }

  changeYear(year: number) {
    this.currentYear = year;
    this.isDropdownVisible.set(false);
  }

  ngOnInit(): void {
    this.fetchSales();
    console.log(this.years);
  }
  constructor(library: FaIconLibrary) {
    library.addIcons(faCalendar, faChevronDown);
  }

  calendarIcon = faCalendar;
  arrowDownIcon = faChevronDown;
}

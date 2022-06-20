
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as Chartist from 'chartist';
import { Departement } from 'src/app/core/models/departement';
import { Salle } from 'src/app/core/models/salle';
import { DemandeService } from 'src/app/core/services/demande.service';
import { DepartementService } from 'src/app/core/services/departement.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EventService } from 'src/app/core/services/event.service';
import { ProjetService } from 'src/app/core/services/projet.service';
import { SalleService } from 'src/app/core/services/salle.service';
export const icons = {
  movement: 'swap_horiz',
  workCenter: 'apartment',
  create: 'add',
  reception: 'home',
  user: 'person_pin',
  application: 'assignment',
  objection: 'assignment_late',
  profileInformation: 'assignment_ind',
  nomenclature: 'receipt',
  notification: 'notifications',
  edit: 'edit',
  type: 'style',
  add: 'add',
  scale: 'description',
  criteria: 'radio_button_checked',
  regionalCommissary: 'store',
  delete: 'delete',
  consult: 'zoom_in',
  search: 'search',
  save: 'save',
  closeDialog: 'close',
  menuOptions: 'more_vert',
  editRequests: 'assignment',
  attachments: 'attachment',
  isMutated: 'check_circle',
  isNotMutated: 'block',
  reset: 'autorenew',
  money: ' monetization_on',
  worker: 'work_outline',
  download: ' save_alt',
  sync: 'cached',
  circle: 'circle',
  empty_circle: 'radio_button_unchecked',
  lock: 'https',
  full_circle: 'fiber_manual_record'
};

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(  private employeeService: EmployeeService,
    private projetService: ProjetService, private demandeService: DemandeService,
    private salleService: SalleService,private eventService:EventService,
    private departementService:DepartementService, private changeDetectorRefs: ChangeDetectorRef) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
this.getEmployees()
this.getprojects()
this.getsalles()
this.getDepartements()
this.getStatEvent()
// this.demandeService.getDemandes().subscribe(res=>{
//   res.filter(dem=>{
//     this.nbre_tot=this.nbre_tot+1
//     if(dem.title=="Presentielle")
//     this.nbre_prese=this.nbre_prese+1
//    else  if(dem.title.includes("distance"))
//     this.nbre_distance=this.nbre_distance+1




    

//   })
//   this.nbre_prese=(this.nbre_prese/this.nbre_tot)*100
//   this.nbre_distance=(this.nbre_distance/this.nbre_tot)*100
//   this.nbre_congés=(this.nbre_congés/this.nbre_tot)*100
//   this.test=true

//   console.log(this.nbre_prese, ' l ',this.nbre_distance, ' ff ',this.nbre_congés, ' n ',this.nbre_tot)

// this.emailChartType = ChartType.Pie;
//       this.emailChartData = {
//         labels: [this.nbre_prese + '%', this.nbre_distance  + '%', this.nbre_congés  + '%'],
//         series: [50, 50, 0]
//       };
//       this.emailChartLegendItems = [
//         { title: 'Présentielle', imageClass: 'fa fa-circle text-info' },
//         { title: 'à distance', imageClass: 'fa fa-circle text-danger' },
//         { title: 'congé', imageClass: 'fa fa-circle text-warning' }
//       ];

//       this.hoursChartType = ChartType.Line;
//       this.hoursChartData = {
//         labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
//         series: [
//           [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
//           [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
//           [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
//         ]
//       };
//       this.hoursChartOptions = {
//         low: 0,
//         high: 800,
//         showArea: true,
//         height: '245px',
//         axisX: {
//           showGrid: false,
//         },
//         lineSmooth: Chartist.Interpolation.simple({
//           divisor: 3
//         }),
//         showLine: false,
//         showPoint: false,
//       };
//       this.hoursChartResponsive = [
//         ['screen and (max-width: 640px)', {
//           axisX: {
//             labelInterpolationFnc: function (value) {
//               return value[0];
//             }
//           }
//         }]
//       ];
//       this.hoursChartLegendItems = [
//         { title: 'Présentielle', imageClass: 'fa fa-circle text-info' },
//         { title: 'à distance', imageClass: 'fa fa-circle text-danger' },
//         { title: 'congé', imageClass: 'fa fa-circle text-warning' }
//       ];

//       this.activityChartType = ChartType.Bar;
//       this.activityChartData = {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         series: [
//           [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
//           [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
//         ]
//       };
//       this.activityChartOptions = {
//         seriesBarDistance: 10,
//         axisX: {
//           showGrid: false
//         },
//         height: '245px'
//       };
//       this.activityChartResponsive = [
//         ['screen and (max-width: 640px)', {
//           seriesBarDistance: 5,
//           axisX: {
//             labelInterpolationFnc: function (value) {
//               return value[0];
//             }
//           }
//         }]
//       ];
//       this.activityChartLegendItems = [
//         { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
//         { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
//       ];
//       const dataDailySalesChart: any = {
//           labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
//           series: [
//               [12, 17, 7, 17, 23, 18, 38]
//           ]
//       };

//      const optionsDailySalesChart: any = {
//           lineSmooth: Chartist.Interpolation.cardinal({
//               tension: 0
//           }),
//           low: 0,
//           high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
//           chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
//       }

//       var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

//       this.startAnimationForLineChart(dailySalesChart);


//       /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

//       const dataCompletedTasksChart: any = {
//           labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
//           series: [
//               [230, 750, 450, 300, 280, 240, 200, 190]
//           ]
//       };

//      const optionsCompletedTasksChart: any = {
//           lineSmooth: Chartist.Interpolation.cardinal({
//               tension: 0
//           }),
//           low: 0,
//           high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
//           chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
//       }

//       var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

//       // start animation for the Completed Tasks Chart - Line Chart
//       this.startAnimationForLineChart(completedTasksChart);



//       /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

//       var datawebsiteViewsChart = {
//         labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
//         series: [
//           [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

//         ]
//       };
//       var optionswebsiteViewsChart = {
//           axisX: {
//               showGrid: false
//           },
//           low: 0,
//           high: 1000,
//           chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
//       };
//       var responsiveOptions: any[] = [
//         ['screen and (max-width: 640px)', {
//           seriesBarDistance: 5,
//           axisX: {
//             labelInterpolationFnc: function (value) {
//               return value[0];
//             }
//           }
//         }]
//       ];
//       var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

//       //start animation for the Emails Subscription Chart
//       this.startAnimationForBarChart(websiteViewsChart);
//     })
  }
nbre_users : number = 0
nbre_salles : number = 0
nbre_projects : number = 0
nbre_departements : number = 0
  getEmployees(){
    this.employeeService.getEmployees().subscribe(res=>{
      res.filter(user=>{
        this.nbre_users= this.nbre_users + 1
      })
    
  
      });
    }

    getprojects(){
      this.projetService.getProjets().subscribe(res=>{
        res.filter(user=>{
          this.nbre_projects= this.nbre_projects + 1
        })
       
       
      })
    }
    getsalles(){
      this.salleService.getSalles().subscribe(res=>{
        this.salleList=res;
        res.filter(user=>{
          this.nbre_salles= this.nbre_salles + 1
        })
        
    
      })
    }
    departementList:Departement[] = [];
    getDepartements(){
      this.departementService.getDepartements().subscribe(res=>{
        this.departementList=res;
        res.filter(user=>{
          this.nbre_departements= this.nbre_departements + 1
        })
      })
    }
   




    static currentId = 1;

    @Input()
    public title: string;
  
    @Input()
    public subtitle: string;
  
    @Input()
    public chartClass: string;
  
    @Input()
    public chartType: ChartType;
  
    @Input()
    public chartData: any;
  
    @Input()
    public chartOptions: any;
  
    @Input()
    public chartResponsive: any[];
  
    @Input()
    public footerIconClass: string;
  
    @Input()
    public footerText: string;
  
    @Input()
    public legendItems: LegendItem[];
  
    @Input()
    public withHr: boolean;
  
    public chartId: string;
  
   
  
 
  
    public ngAfterViewInit(): void {
  
      switch (this.chartType) {
        case ChartType.Pie:
          new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
          break;
        case ChartType.Line:
          new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
          break;
        case ChartType.Bar:
          new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
          break;
      }
      this.getStatEvent()
    }


    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];
    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];

nbre_congés :number = 0;
nbre_distance :number = 0;
nbre_prese :number = 0;
nbre_tot :number = 1
test= false

submit(){
  console.log('form :: ', this.form.getRawValue())
this.getStatEvent();
}
    form: FormGroup = new FormGroup({

    over: new FormControl(null),
    id_salle: new FormControl(null),
    dep_id: new FormControl(null),
    event_title: new FormControl(null),
    event_start:new FormControl(new Date()),
   
  });
  icons = icons;
  salleList:Salle[] = [];


  getStatEvent(){
    this.nbre_tot=0
    this.test=false
    this.form.controls['event_title'].setValue('Présentiel')
this.eventService.getStat(this.form.getRawValue()).subscribe(e=>{
  //this.nbre_tot=this.nbre_tot+1
  this.form.controls['event_title'].setValue('À distance')
  console.log('e',e)
  
  this.eventService.getStat(this.form.getRawValue()).subscribe(f=>{
    //this.nbre_tot=this.nbre_tot+1
    
    this.form.controls['event_title'].setValue('Congé')
    console.log('f',f)
    this.eventService.getStat(this.form.getRawValue()).subscribe(g=>{
      this.nbre_tot=e + f + g
      if(this.nbre_tot!=0){
        if(e!=0)
        e=(e/this.nbre_tot)*100
        if(f!=0)
        f=(f/this.nbre_tot)*100
        if(g!=0)
        g=(g/this.nbre_tot)*100
      }
      

    
      console.log('g',g)
      this.emailChartType = ChartType.Pie;
      this.emailChartData = {
        labels: [new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(
          parseFloat(parseFloat(e.toString()).toFixed(2))
        ) + '%', 
        new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(
          parseFloat(parseFloat(f.toString()).toFixed(2))
        )  + '%', new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(
          parseFloat(parseFloat(g.toString()).toFixed(2))
        )  + '%'],
        series: [e, f, g]
      };
      this.emailChartLegendItems = [
        { title: 'Présentielle', imageClass: 'fa fa-circle text-info' },
        { title: 'À distance', imageClass: 'fa fa-circle text-danger' },
        { title: 'congé', imageClass: 'fa fa-circle text-warning' }
      ];
      this.test=true
      this.hoursChartType = ChartType.Line;
      this.changeDetectorRefs.detectChanges();
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Présentielle', imageClass: 'fa fa-circle text-info' },
        { title: 'À distance', imageClass: 'fa fa-circle text-danger' },
        { title: 'congé', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];
      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
    
      
    })
  })

})
  }


  reset(){
    this.form= new FormGroup({

      over: new FormControl(null),
      id_salle: new FormControl(null),
      dep_id: new FormControl(null),
      event_title: new FormControl(null),
      event_start:new FormControl(new Date()),
     
    });
    this.getStatEvent()
  }
}
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';
import {TemperatureNumberComponent} from './temperature-number/temperature-number.component';
import {myRxStompConfig} from './service/my-rx-stomp.config';
import {ImageComponent} from './image/image.component';
import {TemperatureChartComponent} from './temperature-chart/temperature-chart.component';
import {TemperatureService} from './service/temperature.service';
import {ImageService} from './service/image.service';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureChartComponent,
    TemperatureNumberComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ChartsModule
  ],
  providers: [
    RxStompService,
    TemperatureService,
    ImageService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

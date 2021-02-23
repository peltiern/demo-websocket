import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '@stomp/stompjs';
import {TemperatureService} from '../service/temperature.service';

@Component({
  selector: 'app-temperature-number',
  templateUrl: './temperature-number.component.html',
  styleUrls: ['./temperature-number.component.css']
})
export class TemperatureNumberComponent implements OnInit, OnDestroy {

  // Valeur de la température à afficher
  public temperatureValue;

  // Couleur en fonction de la température
  public color;

  // Abonnement au topic "temperature" du Websocket
  public topicSubscription;

  constructor(private temperatureService: TemperatureService) { }

  ngOnInit(): void {
    // Ecoute du topic "temperature" du Websocket
    this.topicSubscription = this.temperatureService.getMessageObservable()
      .subscribe((message: Message) => this.onNewTemperatureMsg(message));
  }

  ngOnDestroy(): void {
    // Arrêt de l'écoute du topic à la destruction du composant (pour éviter des écoutes multiples)
    this.topicSubscription.unsubscribe();
  }

  /**
   * Met à jour la valeur de la températureà partir du message reçu dans le Websocket.
   * @param message le message reçu dans le Websocket
   */
  private onNewTemperatureMsg(message: Message) {
    const temperatureMsg = JSON.parse(message.body);
    const formattedTemperature = parseFloat(temperatureMsg.temperature).toFixed(2);
    this.temperatureValue = `${formattedTemperature} °C`;
    if (temperatureMsg.temperature > 20) {
      this.color = 'red';
    } else {
      this.color = 'blue';
    }
  }
}

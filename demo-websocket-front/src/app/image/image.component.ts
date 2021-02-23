import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '@stomp/stompjs';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageService} from '../service/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnDestroy {

  // Contenu de l'image à afficher
  public imgContent;

  // Abonnement au topic "temperature" du Websocket
  public topicSubscription;

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Ecoute du topic "image" du Websocket
    this.topicSubscription = this.imageService.getMessageObservable().subscribe((message: Message) => this.onNewContentMsg(message));
  }

  ngOnDestroy(): void {
    // Arrêt de l'écoute du topic à la destruction du composant (pour éviter des écoutes multiples)
    this.topicSubscription.unsubscribe();
  }

  /**
   * Construit le contenu de l'image à partir du message reçu dans le Websocket en sécurisant l'URL.
   * @param message le message reçu dans le Websocket
   */
  private onNewContentMsg(message: Message): void {
    this.imgContent = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${message.body}`);
  }

}

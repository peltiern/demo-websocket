import {Injectable} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {WebSocketService} from './websocket.service';

/**
 * Service permettant d'écouter les messages du Websocket sur le topic "/image.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService extends WebSocketService {

  constructor(
    stompService: RxStompService
  ) {
    super(stompService, '/image');
  }
}

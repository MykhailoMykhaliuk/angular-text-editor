import { Injectable } from '@angular/core';
import { IControl } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ControlPanelService {
  getControls(): IControl[] {
    return [
      {
        title: 'Bold',
        command: 'bold',
        label: 'B'
      },
      {
        title: 'Italic',
        command: 'italic',
        label: 'I'
      },
      {
        title: 'Underline',
        command: 'underline',
        label: 'U'
      }
    ];
  }
}

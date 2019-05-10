import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { map } from 'lodash';
import { ControlPanelService } from '../../services';
import { IControl } from '../../interfaces';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  @Output() applyTransformation: EventEmitter<IControl> = new EventEmitter();

  controls: IControl[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private controlPanelService: ControlPanelService
  ) {}

  ngOnInit() {
    this.controls =  this.controlPanelService.getControls();
  }

  updateControlActivationStatuses() {
    this.controls = map(this.controls, control => ({
      ...control,
      isActive: this.document.queryCommandState(control.command)
    }));
  }

  emitTransformation(control: IControl): void {
    this.applyTransformation.emit(control);
    this.updateControlActivationStatuses();
  }
}

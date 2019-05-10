import { ChangeDetectionStrategy, Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { flow, curry, bind } from 'lodash';
import { ControlPanelComponent } from '../../components/control-panel/control-panel.component';
import { ControlPanelService } from '../../services';
import { IControl, ISynonym } from '../../interfaces';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditorComponent implements OnInit {
  @Input() content = '';

  controls: IControl[];

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @ViewChild(ControlPanelComponent) private controlsComponent: ControlPanelComponent;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private controlPanelService: ControlPanelService
  ) {}

  ngOnInit() {
    this.controls = this.controlPanelService.getControls();
  }

  executeCommand(control: IControl): void {
    this.document.execCommand(control.command);
  }

  updateControlActivationStatuses(): void {
    this.controlsComponent.updateControlActivationStatuses();
  }

  getSelectedWord(): string {
    return this.document.getSelection().toString();
  }

  replaceWord({ word }: ISynonym): Function {
    return flow([
      this.getRangeAt,
      this.deleteContents,
      curry(this.insertNode)(bind.placeholder, word)
    ])(this.document.getSelection());
  }

  getRangeAt(selection: Selection): Range {
    return selection.getRangeAt(0);
  }

  deleteContents(range: Range): Range {
    // unfortunately side effect is needed
    range.deleteContents();
    return range;
  }

  insertNode(range: Range, word: string): void {
    range.insertNode(document.createTextNode(word));
  }
}

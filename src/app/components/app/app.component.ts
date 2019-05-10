import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Simple Text Editor';
  editorContent = '';

  constructor(private textService: TextService) {}

  ngOnInit() {
    this.editorContent = this.textService.getMockText();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isEmpty } from 'lodash';
import { finalize } from 'rxjs/operators';
import { SynonymsService } from '../../services';
import { ISynonym } from '../../interfaces';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.scss']
})
export class SynonymsComponent {
  @Input() targetWord = '';
  @Output() wordChange: EventEmitter<ISynonym> = new EventEmitter();

  synonyms: ISynonym[] = [];
  loading = false;

  constructor(private synonymsService: SynonymsService) {}

  loadSynonyms(word: string): void {
    this.loading = true;
    this.synonymsService.getSynonyms(word)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe(synonyms => {
        this.synonyms = synonyms;
      });
  }

  replaceWord(event: MouseEvent, synonym: ISynonym): void {
    event.stopImmediatePropagation();
    this.loadSynonyms(this.targetWord);
    this.wordChange.emit(synonym);
  }

  isValidWord(word: string): boolean {
    return word && word.split(' ').length === 1;
  }

  areSynonymsLoaded(): boolean {
    return !isEmpty(this.synonyms);
  }
}

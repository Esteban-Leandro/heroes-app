import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject();

  private debouncerSubscription!: Subscription;

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebouncer: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300),
      )
      .subscribe((value: string) => this.onDebouncer.emit(value))
  }

  ngOnDestroy(): void {
    this.debouncerSubscription.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value.toLowerCase())
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

}

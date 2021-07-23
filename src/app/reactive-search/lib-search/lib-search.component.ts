import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    let value = this.queryField.value;
    const fields = 'name,description,version,homepage';
    const params = {
      search: value,
      fields: fields
    };

    let params2: HttpParams = new HttpParams();
    params2 = params2.set('search', value);
    params2 = params2.set('fields', fields);

    if(value && (value = value.trim() ) !== '') {
      this.results$ = this.http.get(this.SEARCH_URL, { params: params2 }).pipe(
        tap( (res: any) => this.total = res.total),
        map( (res: any) => res.results)
      );
    }
  }

}

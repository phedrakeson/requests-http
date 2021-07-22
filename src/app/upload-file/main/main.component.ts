import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public progress: number = 0;
  public files: Set<File>;
  private subscriptions = [];

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event) {
    this.progress = 0;
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    for(let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }

    console.log(selectedFiles.item)
  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      const sub = this.service.upload(this.files, environment.BASE_URL + '/upload')
      .pipe(
        uploadProgress(progress => {
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(res => console.log('upload concluido'));
      // .subscribe(
      //   (event: HttpEvent<Object>) => {
      //     if(event.type === HttpEventType.UploadProgress) {
      //       const percentDone = Math.round((event.loaded) * 100 / event.total);
      //       this.progress = percentDone;
      //     }
      //     if(event.type === HttpEventType.Response) console.log('Concluído');
      //   }
      // )
      this.subscriptions.push(sub) 
    }
  }

  onDownloadPDF() {
    this.service.download(environment.BASE_URL + '/downloadPDF' ).subscribe((res: any) => {
      this.service.handleFile(res, 'report.pdf');
    });
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + '/downloadExcel').subscribe((res: any) => {
      this.service.handleFile(res, 'report.xlsx');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}

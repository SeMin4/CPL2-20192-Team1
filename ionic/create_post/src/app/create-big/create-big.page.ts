import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { StorageService } from '../storage_service_module/storage.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-big',
  templateUrl: './create-big.page.html',
  styleUrls: ['./create-big.page.scss'],
})

export class CreateBigPage implements OnInit{
  // uploader:FileUploader;
  // hasBaseDropZoneOver: boolean;
  // hasAnotherDropZoneOver: boolean;
  // response: string;

  uploadForm: FormGroup;
  attaches = new Set();

  author: string;
  projectID: string;
  body = {
  //   projectID: '',
  //   BigTitle: '',
  //   BigLevel: '',
  //   BigStart: '',
  //   BigEnd: '',
  //   BigDesc: '',
  //   BigStatus: 0,
  //   BigAuthor: '',
  //   BigCreated: '',
  //   BigWeight: '',
  //   BigProgress: 0
    userFiles: []
  }
  // formData : FormData;
  constructor(
    private http: HttpService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private storage: StorageService,
    private formBuilder: FormBuilder
  ) {
    storage.get_uid().then(val => {
      this.author = val;
    });
    storage.get_proj_id().then(val => {
      this.projectID = val;
    });
    // this.formData = new FormData();
  }

  ngOnInit(){
    this.uploadForm = this.formBuilder.group({
      // body: this.body,
      BigTitle: new FormControl(),
      BigLevel: new FormControl(),
      BigStart: new FormControl(),
      BigEnd: new FormControl(),
      BigWeight: new FormControl(),
      BigDesc: new FormControl(),
      BigCreated: '',
      files: new FormControl([''])
    });
  }
  
  
  setFiles($event) {
    let files : FileList;
    files = $event.path[0].files;
    
    for(let i=0; i<files.length; ++i){
      this.attaches.add(files[i]);
      // this.formData.append('userFiles', files[i]);
    }
    
  }
  create_task() {
    console.log(this.uploadForm.get('files'))
    const fileSetValues = Array.from(this.attaches.values());
    
    this.body.userFiles = fileSetValues;
    console.log(this.body.userFiles)
    // for(let i=0; i<fileSetValues.length; ++i){
      // formData.append('userFiles', fileSetValues[i]);
    // }
    // this.uploadForm.get('files').setValue(fileSetValues);
    
    // let start:string, end:string, created:string;
    // start = this.uploadForm.get('BigStart').value;
    // start = start.substr(0, 10) + " " + start.split('T')[1].substr(0, 8);
    // end = this.uploadForm.get('BigEnd').value;
    // end = end.substr(0, 10) + " " + end.split('T')[1].substr(0, 8);
    // let now = new Date().toISOString();
    // created = now.substr(0, 10) + " " + now.split('T')[1].substr(0, 8);

    
    // formData.append('projectID', this.projectID);
    // formData.append('BigAuthor', this.author);
    // formData.append('BigStatus', '0');
    // formData.append('BigProgress', '0');
    // formData.append('BigTitle', this.uploadForm.get('BigTitle').value);
    // formData.append('BigLevel', this.uploadForm.get('BigLevel').value);
    // formData.append('BigStart', start);
    // formData.append('BigEnd', end);
    // formData.append('BigWeight', this.uploadForm.get('BigWeight').value);
    // formData.append('BigDesc', this.uploadForm.get('BigDesc').value);
    // formData.append('BigCreated', created);
    
    // formData.append('userFiles', this.uploadForm.get('files').value);

    // let a = "{";
    // for (let i=0; i<setValues.length; ++i) {
    //   a += `${i}: "${setValues[i]}", `;
    // }
    // a = a.slice(0, -2);
    // a += '}';
    // this.body.BigAttach = a;

    

    // this.body.BigStart = this.body.BigStart.substr(0, 10) + " " + this.body.BigStart.split('T')[1].substr(0, 8);
    // this.body.BigEnd = this.body.BigEnd.substr(0, 10) + " " + this.body.BigEnd.split('T')[1].substr(0, 8);
    // this.body.BigCreated = new Date().toISOString();
    // this.body.BigCreated = this.body.BigCreated.substr(0, 10) + " " + this.body.BigCreated.split('T')[1].substr(0, 8);
  //   console.log(formData.get('BigAuthor'));
  //   console.log(formData.get('BigCreated'));
    // console.log(formData.get('files'));
    // console.log(formData.keys)
    let ret = this.http.upload(this.body);
  //   if (ret) {
  //     this.alertController.create({
  //       header: 'Confirm!',
  //       subHeader: '작업 추가 성공!',
  //       message: '업무리스트로 이동합니다.',
  //       buttons: [{
  //         text: '확인',
  //         handler: () => {
  //           this.navCtrl.navigateForward('/task-list');
  //         }
  //       }]
  //     }).then(alert => {
  //       alert.present();
  //     });
  //   } else {
  //     this.alertController.create({
  //       header: 'Reject!',
  //       subHeader: '작업 추가 실패',
  //       message: '잠시후 다시 시도해주세요.',
  //       buttons: [{
  //         text: '확인'
  //       }]
  //     }).then(alert => {
  //       alert.present();
  //     });
  //   }
  }

  date_validate(){
    let valid = this.uploadForm.get('BigStart').value < this.uploadForm.get('BigEnd').value;
    console.log("vaild: " +valid)

  //   if(valid)
  //     return;
    
  //   this.alertController.create({
  //     header: 'Reject!',
  //     subHeader: '종료 날짜 오류',
  //     message: '종료 날짜는 시작 날짜보다 이후여야 합니다',
  //     buttons: [{
  //       text: '확인'
  //     }]
  //   }).then(alert => {
  //     alert.present();
  //   });
  }

}

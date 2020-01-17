import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service.model';
import { ServicesService } from '../../../services/services.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
  private service = new Service(5,'zeaz','xdazeza',5,5);
  serviceForm : FormGroup;
  private submitted = false;

  constructor(
    private servicesService:ServicesService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.serviceForm = this.formBuilder.group({
      title: '',
      description: '',
      price: 0,
      timerequired: 0,
      photo: '',
    });
  }

  handleFileInput(fileList){
    const file = fileList.item(0);
    this.serviceForm.get('photo').setValue(file)
  }

  onSubmit(){
    var formData = new FormData();
    console.log(this.serviceForm.get('description').value)
    formData.append('file', this.serviceForm.get('photo').value , "xd");
    formData.append('title', this.serviceForm.get('title').value);
    formData.append('description', this.serviceForm.get('description').value);
    formData.append('price', this.serviceForm.get('price').value);
    formData.append('timerequired', this.serviceForm.get('timerequired').value);
    this.servicesService.addService(formData).subscribe(
      service => console.log(service),
      err => console.log(err))
  }
}

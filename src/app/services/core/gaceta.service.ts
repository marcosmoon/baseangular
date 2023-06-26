import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/interfaces/IResponse';
import { ITicketResponse } from 'src/app/interfaces/ITicketResponse';
import { ITicketUpdateResponse } from 'src/app/interfaces/ITicketUpdateResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GacetaService {
  private apiURL = environment.apiURL + '/gaceta';
  constructor(
    private http: HttpClient
  ) { }

  addGaceta(data: FormData){
    return this.http.post<IResponse<boolean>>(`${this.apiURL}/addGaceta`, data)
  }

  getAllPdfs(){
    return this.http.get<IResponse<Array<ITicketResponse>>>(`${this.apiURL}/GetAllPdfs`);
  }

  GetDownloadFile(id_file: string) {
    return this.http.get(`${environment.apiURL}/gaceta/GetDownloadFile/${id_file}`, { responseType: 'arraybuffer' });
  }

  getGacetaById(id: string){
    return this.http.get<IResponse<ITicketResponse>>(`${this.apiURL}/getGacetaByid?id=${id}`);
  }

  updateGaceta(data: FormData){
    return this.http.put<IResponse<boolean>>(`${this.apiURL}/updateGaceta`, data)
  }
  
  deleteGaceta(id: string): Observable<IResponse<boolean>> {
    return this.http.delete<IResponse<boolean>>(`${this.apiURL}/deleteGaceta/${id}`);
  }

  addSlider(data: FormData){
    return this.http.post<IResponse<boolean>>(`${this.apiURL}/addSlider`, data)
  }

  updateSlider(data: FormData){
    return this.http.put<IResponse<boolean>>(`${this.apiURL}/updateSlider`, data)
  }

  getAllSlider(){
    return this.http.get<IResponse<Array<ITicketResponse>>>(`${this.apiURL}/GetAllSlider`);
  }

  GetDownloadImage(id_file: string) {
    return this.http.get(`${environment.apiURL}/gaceta/GetDownloadImage/${id_file}`, { responseType: 'arraybuffer' });
  }
  getSliderById(id: string){
    return this.http.get<IResponse<ITicketResponse>>(`${this.apiURL}/getSliderByid?id=${id}`);
  }

  deleteSlider(id: string): Observable<IResponse<boolean>> {
    return this.http.delete<IResponse<boolean>>(`${this.apiURL}/deleteSlider/${id}`);
  }
}

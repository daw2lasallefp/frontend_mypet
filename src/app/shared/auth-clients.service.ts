import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Clients } from "../models/clients";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import { ClientsRaw } from "../models/clients.raw";

@Injectable({
  providedIn: "root",
})
export class AuthClientsService {
  private REGISTER_CLIENTS_API_SERVER =
    "http://127.0.0.1:8000/api/registerClients";
  private LOGIN_CLIENTS_API_SERVER = "http://127.0.0.1:8000/api/loginClients";
  private LIST_CLIENTS_API_SERVER = "http://localhost:8000/api/clientsList";
  private UPDATE_CLIENTS_API_SERVER =
    "http://127.0.0.1:8000/api/clients/update/";
  private DELETE_CLIENTS_API_SERVER =
    "http://127.0.0.1:8000/api/clients/delete/";
  private currentClient: BehaviorSubject<Clients | null> =
    new BehaviorSubject<Clients | null>(null);

  getCurrentClientValue(): Observable<Clients | null> {
    return this.currentClient.asObservable();
  }
  setCurrentClientValue(newValue: Clients | null): void {
    this.currentClient.next(newValue);
  }

  constructor(private http: HttpClient) {}

  // Registro
  register(clients: Clients): Observable<Clients> {
    return this.http
      .post<Clients>(this.REGISTER_CLIENTS_API_SERVER, clients)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 409) {
          } else {
            alert("Email existente, inténtelo de nuevo más tarde");
          }
          return throwError(error);
        })
      );
  }

  // Login
  signin(clients: Clients): Observable<Clients> {
    return this.http.post<Clients>(this.LOGIN_CLIENTS_API_SERVER, clients).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 400) {
          console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error}`
          );
        } else if (error.status == 500) {
          console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error}`
          );
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`
          );
        }
        return throwError(error.error);
      })
    );
  }

  //CLientes id

  getAuthenticateUser(): Observable<ClientsRaw> {
    return this.http.get<ClientsRaw>("http://127.0.0.1:8000/api/userClients");
  }

  //list clients
  listClients(numPage: number = 1): Observable<any> {
    return this.http.get<any>(this.LIST_CLIENTS_API_SERVER, {
      params: { page: numPage.toString() },
    });
  }

  //Update
  updateClients(clients: Clients): Observable<Clients> {
    return this.http
      .put<Clients>(this.UPDATE_CLIENTS_API_SERVER + clients.id, clients)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError("Algo ha ido mal, intentelo de nuevo mas tarde");
        })
      );
  }

  deleteClients(id: number): Observable<any> {
    return this.http.delete<Clients>(this.DELETE_CLIENTS_API_SERVER + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError("Algo ha ido mal, intentelo de nuevo mas tarde");
      })
    );
  }

  // req-password-reset
  // reqPasswordReset(data) {
  //   return this.http.post('http://127.0.0.1:8000/api/resetPass', data)
  // }

  // update password
  // updatePassword(data) {
  //   return this.http.post('http://127.0.0.1:8000/api/updatePass', data)
  // }
}

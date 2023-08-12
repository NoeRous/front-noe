import { Component } from '@angular/core';
import { PostulationTestService } from '../postulation-test.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-page-form-postulation-test',
  templateUrl: './page-form-postulation-test.component.html',
  styleUrls: ['./page-form-postulation-test.component.scss']
})
export class PageFormPostulationTestComponent {

  postulationId: any | undefined;
  postulationTest: any | undefined;
  postulationTestResponses: any[] | undefined;

  panelResponses: any[] | undefined;
  porcentajeProgreso:number=0;

  questions:any[]=[];
  pageQuestions:any[]=[];
  indexPage:number = 0;
  perPage:number = 5;

  constructor(
    private postulationTestService: PostulationTestService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  postulationResponsesForm = this.fb.group({
    postulation_id:2,
    postulation_responses: [
     [ {
        test_group_question_id:9,
        response_time:2,
        question_response_id:2
      }
     ]
    ],

  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postulationId = params.get('postulationId');
      const id_ = this.postulationId;
      this.getPostulationTest(this.postulationId);
    })
  }

  getPostulationTest(postulationId:number): void {
      this.postulationTestService.getPostulationTest(postulationId)
      .subscribe(postulationTest => {
        this.postulationTest = postulationTest;
        this.questions = this.postulationTest.data;


        var indexStart = this.indexPage;
        var indexEnd = indexStart + this.perPage;
        this.pageQuestions =this.questions;
        this.pageQuestions = this.pageQuestions.slice(indexStart,indexEnd)

        this.itemsPanel(this.postulationTest.data);

        // if (postulationTest.id) {
        //   this.postulationTest = postulationTest;
        //   this.router.navigate(['/admin/postulation-test/create/', this.postulationId]);
          
        // } else {
        //   this.router.navigate(['/admin/postulation']);
        // }
      });
  }

  itemsPanel(questions:any[]){
    let respData: { question_id: any; is_response: boolean; }[] = [];
    questions.forEach(item => {
     var question_id = item.test_group_question.question.id;
     respData.push({question_id, is_response:false});
    });
    this.panelResponses = respData;
  }
  selectUserPanel(index:any){
    if (this.panelResponses) {
      this.panelResponses[index].is_response = true;
      var responses= this.panelResponses.filter(x=>x.is_response == true);
      var totalPreguntas = this.panelResponses.length;
      this.porcentajeProgreso=  (((responses.length+1) * totalPreguntas)/100)*10;
    }
  }

  //aqui el metodo para agregar la respuesta al array 
  sendTestResponse(item: any, itemResponse: any, index:number) {
    this.selectUserPanel((this.indexPage ) + index);
    this.postulationTestResponses=[];
    const testResponse = {
      test_group_question_id: item.test_group_question.id,
      response_time: 1,
      question_response_id: itemResponse.id
    };
    this.postulationTestResponses = [testResponse];

    const postulationResponses = {
      postulation_id:this.postulationId,
      postulation_responses:this.postulationTestResponses
    };
    this.postulationTestService
      .addPostulationResponses(postulationResponses)
      .subscribe(() => {
        // Realizar acciones adicionales después de enviar los datos exitosamente
        // this.router.navigate(['/admin']);
        // this.messageService.openSnackBar("Nuevo Registro");
      });
  }


  btnPostulation(){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { title: "Confirmar", message: `¿Esta seguro terminar el examen?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.router.navigate(['/admin/postulation/']);
      }
    });

  }


  btnAnterior(){
    this.indexPage = this.indexPage - this.perPage;
    var indexStart = (this.indexPage - this.perPage);
    var indexEnd = this.indexPage -1;
    this.pageQuestions =this.questions;
    this.pageQuestions = this.pageQuestions.slice(indexStart,indexEnd)

   
  }

  btnSiguiente(){



    var indexStart = this.indexPage 
    var indexEnd = (this.indexPage + this.perPage);
    this.pageQuestions =this.questions;
    this.pageQuestions = this.pageQuestions.slice(indexStart,indexEnd)
    this.indexPage = this.indexPage + this.perPage;

 
    
  

  }

}

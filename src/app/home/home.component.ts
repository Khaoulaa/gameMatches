import { Component, OnInit, HostListener, Directive } from '@angular/core';
import { FormBuilder,FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  formGame: FormGroup ;
  max =3;
  showGame :boolean=false;
  player1 ={
    name : null, 
    tower : true 
  };
  player2 ={ 
    name : null ,
    tower : false 

  };
  player3 ={ 
    name : null ,
    tower : false 

  };
  matchers ={
    all : null,
    rest : null
  };
  numbers: any[];
  matcherCurrent: any;
  constructor(private fb : FormBuilder) { 
    this.formGame= this.fb.group({
      pseudo1 : [null , Validators.required],
      pseudo2 : [null , Validators.required],
      pseudo3 : [null , Validators.required],
      numberMatches : [null , [Validators.required ,Validators.max(31)]]
    });
  }

  ngOnInit() {
     
  }
  reloadGame()
  {
   this.matcherCurrent=null
   this.numbers=[]
   this.matchers.rest=null;
   this.player1 ={
    name : null, 
    tower : true 
  };
  this.player2 ={ 
    name : null ,
    tower : false 

  };
  this.player3 ={ 
    name : null ,
    tower : false 

  }
  this.showGame=false;

  
  }
  startGame(_value)
  {
     this.showGame=true;
     console.log('value form game ::',this.formGame.value );
     if(_value  && _value != null)
     {
       this.player1.name = _value.pseudo1 
       this.player2.name=_value.pseudo2
       this.player3.name=_value.pseudo3
       this.matchers.all=_value.numberMatches
       this.matchers.rest=_value.numberMatches
       this.numbers = Array(this.matchers.rest).fill(4);
     }
  }
  selectMatchers(_index)
  {
    console.log('select' , _index)
    if(this.matchers.rest > 0)
    {
      if(_index <= this.max)
       {_index ++;
        this.matchers.rest=this.matchers.rest - _index;
        this.numbers = Array(this.matchers.rest).fill(4);
        if(this.player1.tower === true)
        {
          this.player2.tower=true;
          this.player3.tower=false;
          if(this.matchers.rest > 0)
          this.player1.tower=!this.player1.tower;
        }
        else if( this.player2.tower === true )
        {
          this.player1.tower=false;
          this.player3.tower=true;
          if(this.matchers.rest > 0)
          this.player2.tower=!this.player2.tower;
        }
        else{
          this.player1.tower=true;
          this.player2.tower=false;
          if(this.matchers.rest > 0)
          this.player3.tower=!this.player3.tower;
        }
     
      }
      else
      {
        alert("choisir max 3 allumettes ! ");
      }

    }
    
  }
  hoveIn(event)
  {
   
    var target = event.target || event.srcElement || event.currentTarget;
    var indexAttr = target.attributes.index.value;
    this.matcherCurrent=indexAttr;
    console.log('hi' , indexAttr );
    //this.matcherCurrent = _index;
   
  }
  getMatcherCurrent()
  {
    
    return this.matcherCurrent;
  }
  getWinner()
  {
    
    return (this.player1.tower ? this.player1.name : this.player2.tower ? this.player2.name : this.player3.name)
  }

}

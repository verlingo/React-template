import React, {Component} from 'react';
import './canvasComponent.css';

class canvasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paraid:null,
            clickpara:null,
            hover:false,
            showInfo:false,
            text:'',
            showcoords:0,
            Sentences:[]
        };
      }

      componentDidMount() {
        const canvas =  this.refs['canvas' + this.canvasindex]
        const ctx = canvas.getContext("2d")
        ctx.scale(.225, .225);
        ctx.globalAlpha = 0.5;
        this.renderMap()
      }

      parainfo(){ 
        return this.props.page.Paragraphs[this.clickpara]
      }

      transformgrade(grade){
        if (grade > 0 && grade <= 2 ){
          return "goodsentence"
        } else if (grade === 3){
          return "mediumsentence"
        } else if (grade >3){
          return "badsentence"
        }
        return "neutral"
      }

      renderMap() {
        const canvas =  this.refs['canvas' + this.canvasindex]
        const ctx = canvas.getContext("2d")
        
        
            for (let k = 0; k < this.props.page.Paragraphs.length; k++) {
              const paragraph = this.props.page.Paragraphs[k];
             
              ctx.strokeStyle = "rgb(70, 70, 70)";
              ctx.lineWidth="4";

              if (paragraph.HeadlineType) {         
                ctx.strokeStyle = "rgb(94, 186, 0)";
                ctx.lineWidth = "8";
              }
              ctx.strokeRect(paragraph.X, paragraph.Y, paragraph.W, paragraph.H);
            }
          }

      clickCrop = (e) => {
        const canvas =  this.refs['canvas' + this.canvasindex]
        const ctx = canvas.getContext("2d")
        this.setState({clickpara: this.state.paraid})
        if (e.target.className === "zeugniselementDetail" || e.target.parentElement.className === "zeugniselementDetail" ) {
            return
        }
        this.setState({showInfo: false})
        if (this.state.hover === true){
        var r 
          var Sentences = []
          this.props.page.Paragraphs[this.state.paraid].Sentences.forEach(el => {
            Sentences.push({class:this.transformgrade(el.Rating), text:el.Content})
          });
          this.setState({Sentences: Sentences})
          r = canvas.getBoundingClientRect()
        const y = e.clientY - r.top
        this.setState({showcoords: (y - 50)})
        this.setState({showInfo: true})
      }
      }
      
      mousemoved = (e) => {
        const canvas =  this.refs['canvas' + this.canvasindex]
        const ctx = canvas.getContext("2d") 
        this.setState({hover: false})
        var r = canvas.getBoundingClientRect(),
         x = e.clientX - r.left, y = e.clientY - r.top;
         for(let i = 0; i < this.props.page.Paragraphs.length; i++) {
           const paragraph = this.props.page.Paragraphs[i]
         if( x >= paragraph.X*.225312 && 
             x <=paragraph.Xendpoint*.225312 &&
             y >= paragraph.Y*.2251995 && 
             y <= paragraph.Yendpoint*.2251995) {
              this.setState({paraid: i})
              this.setState({hover: true})
             break;        
     }
     }
     ctx.clearRect(0, 0, canvas.width/.225312, canvas.height/.2251995);
     this.renderSingle()
   }

   renderSingle() {
    const canvas =  this.refs['canvas' + this.canvasindex]
    const ctx = canvas.getContext("2d") 
    for(let i = 0; i < this.props.page.Paragraphs.length; i++) {
      const paragraph = this.props.page.Paragraphs[i]
      if (this.state.hover && this.state.paraid === i ) {
      ctx.fillStyle = "rgba(93, 149, 201,0.5)"
      ctx.fillRect(paragraph.X, paragraph.Y, paragraph.W, paragraph.H);
      ctx.strokeStyle = "rgb(93, 149, 201)";
      ctx.lineWidth="4";
      ctx.strokeRect(paragraph.X, paragraph.Y, paragraph.W, paragraph.H);
      } else{
      ctx.strokeStyle = "rgb(70, 70, 70)";
      ctx.lineWidth="4";
      ctx.strokeRect(paragraph.X, paragraph.Y, paragraph.W, paragraph.H);
      }
    }
  }
  
    render() {
        return (
            <div className="imageviewer">
                <img src={'data:image/jpeg;base64,'+this.props.page.Images[0].Image} alt="attachment"/>
                <canvas onMouseMove={this.mousemoved} onClick={this.clickCrop} ref={'canvas' + this.canvasindex} width="559" height="790"></canvas>
                {this.state.showInfo ? (
                <div className="zeugniselementDetail" style={{ top: this.state.showcoords + 'px' }} >
                  {this.state.Sentences.map((sentence, i) => 
                    <span className={sentence.class} key={i}> {sentence.text}</span>
                  )}
                </div>  
                ):''}  
            </div>    
        );
    }
}

export default canvasComponent;
import React, {Component} from 'react';
import CanvasComponent from './canvasComponent';
import './Arbeitszeugnis.css';
import user from '../assets/img/user.svg'
import briefcase from '../assets/img/briefcase.svg'
import graduationCap from '../assets/img/graduation-cap.svg'
import sitemap from '../assets/img/sitemap.svg'
import clock from '../assets/img/clock.svg'
import building from '../assets/img/building.svg'
import chartLine from '../assets/img/chart-line.svg'
import users from '../assets/img/users.svg'
import signOut from '../assets/img/sign-out-alt.svg'
import infoicon from '../assets/img/info.svg'
import copyicon from '../assets/img/copy.svg'
import hashtagicon from '../assets/img/hashtag.svg'
import signinicon from '../assets/img/sign-in-alt.svg'
import signouticon from '../assets/img/sign-out.svg'
import birthdayCakeIcon from '../assets/img/birthday-cake.svg'
import mapMarkerIcon from '../assets/img/map-marker-alt.svg'
import fileIcon from '../assets/img/file-alt.svg'
import calendarIcon from '../assets/img/calendar-alt.svg'

class Arbeitszeugnis extends Component {
    constructor(props) {
        super(props);
        this.state = {
          switch: 0,
        };
      }
    //converts Duration to Months or Years
   jahreRechner(x){
        if(x >= 12){
          return Math.ceil(x/12) + ' Jahre';
        }
        else{
        return x + " Monaten"
        }
      }
      //replaces a grade that is equal to 0 to with "-" else return the grade
      formatGrade(grade){
        if (grade === 0) {
          return '-'
        }
        return grade.toLocaleString()
      }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-lg-6 order-1 order-lg-last swipeleft">
                <div className="resultcard">
                    <div className="resultcard-header">
                    <div className="header-offset">
                        <div className="col-12 rightheadoffset"></div>
                    </div>

                    <div className="resultcard-grade" data-toggle="tooltip" data-delay="500" title="Gesamtnote">
                        <div>{this.formatGrade(this.props.daten.Gesamtnote)}</div>
                        <div className="text-Gesamtnote">Gesamtnote</div>
                    </div>
                    <div className="rating" data-toggle="tooltip" data-delay="500" title="3">
                        {this.props.daten.GesamtnoteRating}

                    </div>
                    <div className="owner-details">
                        <div className="owner-name">
                        <span><img className="zp-icon-big" src={user} alt="user" /> {this.props.daten.Inhaber} ({this.props.daten.Alter})</span>
                        </div>
                        <div className="owner-job">
                        <span><img className="zp-icon" src={briefcase} alt="briefcase" /> {this.props.daten.Berufsbezeichnung} </span>
                        {this.props.daten.Abteilung ? (<span><img className="zp-icon" src={sitemap} alt="sitemap" /> {this.props.daten.Abteilung}</span>) :''}<br/>
                        {this.props.daten.Fachrichtung ? (<span><img className="zp-icon" src={graduationCap} alt="graduationCap" /> {this.props.daten.Fachrichtung}</span>):''}
                        {this.props.daten.BeschaeftigungsdauerInMonaten ? (<span><img className="zp-icon" src={clock} alt="clock" /> {this.jahreRechner(this.props.daten.BeschaeftigungsdauerInMonaten)}</span>):''}<br/>
                        {this.props.daten.Firma ? (<span><img className="zp-icon" src={building} alt="building" /> {this.props.daten.Firma}</span>):''}
                        </div>
                    </div>

                    <div className="Teilnoten">
                        <div className="row justify-content-center">
                        <div className="teilnote">
                            <div className="notenkreis"> <img className="zp-icon-big" src={chartLine} alt="chartLine" /></div>
                            <div className="text-teilnote">Leistung<p id="noteleistung">Note {this.formatGrade(this.props.daten.GesamtnoteLeistungbeurteilung)}</p></div>
                        </div>
                        <div className="teilnote">
                            <div className="notenkreis"><img className="zp-icon-big" src={users} alt="users" /></div>
                            <div className="text-teilnote">Verhalten<p id="noteverhalten">Note {this.formatGrade(this.props.daten.GesamtnoteVerhalten)}</p></div>
                        </div>
                        <div className="teilnote">
                            <div className="notenkreis"><img className="zp-icon-big" src={signOut} alt="signOut" /></div>
                            <div className="text-teilnote">Schluss<p id="noteschluss">Note {this.formatGrade(this.props.daten.GesamtnoteSchlussformulierung)}</p></div>
                        </div>
                        </div>
                    </div>

                    <div className="cardheadertabs">
                        <div className={this.state.switch === 0 ? 'tab active' :'tab'} onClick={() => this.setState({switch: 0})}>Übersicht</div>
                        <div className={this.state.switch === 1 ? 'tab active' :'tab'} onClick={() => this.setState({switch: 1})}>Tätigkeiten</div>
                    </div>
                    </div>

                    <div className="result-body">
                    {this.state.switch === 0 ? (
                    <div className="tabpanel active" id="uebersicht">
                    <div className="result-heading">Teilnoten</div>
                    <div className="kategorien">
                        {this.props.daten.GesamtnoteProOberkategorie.map((category, i) => 
                            <div className="kategorie" key={i}>
                            <div className={category.Gesamtnote < 1 ? 'kategorie-note no-grade' : category.Gesamtnote < 2.5 ? 'kategorie-note good-grade' : category.Gesamtnote < 3.5 ? 'kategorie-note medium-grade' : 'kategorie-note bad-grade'}>{this.formatGrade(category.Gesamtnote)}</div>
                            <div className="kategorie-text"><p className="name">{category.Bezeichnung}</p><p>{category.Info}</p></div>
                            </div>
                        )}
                    </div>
                    </div>) : (
                    <div className="tabpanel active">
                        <div className="result-heading">Tätigkeiten</div>
                        <div className="taetigkeiten">
                        <ul className="list-group list-group-flush">
                        {this.props.daten.Taetigkeiten.map((task, i) => 
                            <li className="list-group-item">{task}</li>
                        )}
                        </ul>
                        </div>
                    </div>)}
                    </div>

                    <div className="result-heading">Auffälligkeiten</div>
                    <div className="auffaelligkeiten" >
                    {this.props.daten.Auffaelligkeiten.map((info, i) => 
                    <div key={i} className={info.Schweregrad === 'auffaelligkeit mittel' ? 'auffaelligkeit mittel': info.Schweregrad === 'auffaelligkeit schwer' ? 'auffaelligkeit schwer' : 'auffaelligkeit bg-green'}>
                        <h4 className="heading-auf"><img className="zp-icon" src={infoicon} alt="info" /> {info.Beschreibung}</h4>
                        <p ></p>
                        {info.Details.map((detail, j) => 
                        <p key={j}>{detail}</p>
                        )}
                        <p className="small"></p>
                    </div>)}
                    </div>

                    <div className="result-heading">Zeugnisaufteilung</div>
                    <div className="Zeugnisaufteilung col-12">
                        <table className="table table-responsive-sm aufteilung">
                        <thead className="thead-light">
                        <tr>
                            <th>Ihr Zeugnis</th>
                            <th>Zeugniselement</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.daten.Zeugnisaufteilung.map((aufteilung, i) =>    
                        <tr key={i}>
                        <td>{Math.ceil(aufteilung.Anteil*100) + '%'}</td>
                        <td className="farbe">{aufteilung.Zeugniselement}</td>
                        </tr>)}
                        </tbody>
                        </table>
                    </div>
                    <div className="result-heading">Details</div>
                    <div className="row details ml-0 mr-0">
                        <div className="details-col col-12 col-sm-6">
                        <span v-if="this.props.daten.Seitenanzahl"><img className="zp-icon" src={copyicon} alt="copy" /> Seitenanzahl: {this.props.daten.Seitenanzahl}</span>
                        <span v-if="this.props.daten.Wortanzahl"><img className="zp-icon" src={hashtagicon} alt="hashtag" /> Wortanzahl: {this.props.daten.Wortanzahl}</span>
                        <span v-if="this.props.daten.Beschaeftigungsbeginn"><img className="zp-icon" src={signinicon} alt="sign-in" /> Eintrittsdatum: {this.props.daten.Beschaeftigungsbeginn}</span>
                        <span v-if="this.props.daten.Beschaeftigungsende"><img className="zp-icon" src={signouticon} alt="sign-out" /> Austrittsdatum: {this.props.daten.Beschaeftigungsende}</span>
                        </div>
                        <div className="details-col col-12 col-sm-6">
                        <span v-if="this.props.daten.Geburtsdatum"><img className="zp-icon" src={birthdayCakeIcon} alt="birthday" /> Geburtsdatum: {this.props.daten.Geburtsdatum}</span>
                        <span v-if="this.props.daten.Geburtsort"><img className="zp-icon" src={mapMarkerIcon} alt="map-marker" /> Geburtsort: {this.props.daten.Geburtsort}</span>
                        <span v-if="this.props.daten.Zeugnisart"><img className="zp-icon" src={fileIcon} alt="file" /> Zeugnisart: {this.props.daten.Zeugnisart}</span>
                        <span v-if="this.props.daten.Creationdate"><img className="zp-icon" src={calendarIcon} alt="file" /> Analysedatum: {this.props.daten.Creationdate}</span>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col-12 col-lg-6">
                {this.props.daten.Dokument.Pages.map((page, k) => 
                <div className="imagecard" key={k}>
                    <CanvasComponent page={page} canvasindex={k} />
                </div> 
                )}  
                </div>
                {/* </div> */}
  </div>
        );
    }
}

export default Arbeitszeugnis;
import React from 'react';
import './EventsCalendar.css'; // We'll create this CSS file next

function EventsCalendar() {
  return (
    <div className="events-calendar-container">
      <h3>Events Calendar</h3>
      <div className="calendar">
        <div className="calendar-header">
          <button>&lt;</button>
          <span>April</span> 
          <button>&gt;</button>
        </div>
        <div className="calendar-body">
          
          <div className="calendar-week">
            <div className="calendar-day empty"></div> {/* Sunday */}
            <div className="calendar-day empty"></div> {/* Monday */}
            <div className="calendar-day">1</div>   {/* Tuesday */}
            <div className="calendar-day event-day">2</div> {/* Wednesday */}
            <div className="calendar-day">3</div>   {/* Thursday */}
            <div className="calendar-day">4</div>   {/* Friday */}
            <div className="calendar-day event-day">5</div> {/* Saturday */}
          </div>
          {/* Week 2 */}
          <div className="calendar-week">
            <div className="calendar-day">6</div>
            <div className="calendar-day">7</div>
            <div className="calendar-day event-day">8</div>
            <div className="calendar-day">9</div>
            <div className="calendar-day">10</div>
            <div className="calendar-day event-day">11</div>
            <div className="calendar-day">12</div>
          </div>
          {/* Week 3 */}
          <div className="calendar-week">
            <div className="calendar-day">13</div>
            <div className="calendar-day">14</div>
            <div className="calendar-day">15</div>
            <div className="calendar-day event-day">16</div>
            <div className="calendar-day">17</div>
            <div className="calendar-day">18</div>
            <div className="calendar-day event-day">19</div> {/* Today's date in the scenario */}
          </div>
          {/* Week 4 */}
          <div className="calendar-week">
            <div className="calendar-day">20</div>
            <div className="calendar-day">21</div>
            <div className="calendar-day">22</div>
            <div className="calendar-day event-day">23</div>
            <div className="calendar-day">24</div>
            <div className="calendar-day">25</div>
            <div className="calendar-day">26</div>
          </div>
          {/* Week 5 */}
          <div className="calendar-week">
            <div className="calendar-day">27</div>
            <div className="calendar-day">28</div>
            <div className="calendar-day event-day">29</div>
            <div className="calendar-day">30</div>
            <div className="calendar-day empty"></div>
            <div className="calendar-day empty"></div>
            <div className="calendar-day empty"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsCalendar;
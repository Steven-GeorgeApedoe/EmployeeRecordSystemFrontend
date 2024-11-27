const greeting = document.querySelector('.greeting');
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

greeting.innerHTML = `Welcome ${userDetails.firstName} ${userDetails.lastName}`

const renderAttendanceCalendar = () => {
    if (!userDetails || !userDetails.attendance) return;
  
    const calendarContainer = document.getElementById('calendar-container');
    const date = new Date();
    const currentMonth = date.getMonth(); // Current month (0-11)
    const currentYear = date.getFullYear(); // Current year (e.g., 2024)
  
    // Generate a calendar for the current month
    const firstDay = new Date(currentYear, currentMonth, 1); // First day of the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0); // Last day of the month
  
    const totalDays = lastDay.getDate(); // Total number of days in the current month
    const firstDayOfWeek = firstDay.getDay(); // Day of the week the month starts on (0-6)
  
    // Clear the previous content
    calendarContainer.innerHTML = '';
  
    // Create day labels (Sun, Mon, Tue, ...)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      const dayLabel = document.createElement('div');
      dayLabel.className = 'day';
      dayLabel.textContent = day;
      calendarContainer.appendChild(dayLabel);
    });
  
    // Add empty slots for the leading empty days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptySlot = document.createElement('div');
      emptySlot.className = 'day';
      calendarContainer.appendChild(emptySlot);
    }
  
    // Add the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      const day = document.createElement('div');
      day.className = 'day';
      day.textContent = i;
  
      // Check if the day is in the attendance array and color it
      const currentDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const attendance = userDetails.attendance.find(entry => entry.date === currentDate);
  
      if (attendance && attendance.value === 1) {
        day.classList.add('attended'); // Color the day if attended
      }
  
      calendarContainer.appendChild(day);
    }
  };

const renderRegularCalendar = () => {
    if (!userDetails || !userDetails.attendance) return;
  
    const calendarContainer = document.getElementById('calendar-section');
    const date = new Date();
    const currentMonth = date.getMonth(); // Current month (0-11)
    const currentYear = date.getFullYear(); // Current year (e.g., 2024)
  
    // Generate a calendar for the current month
    const firstDay = new Date(currentYear, currentMonth, 1); // First day of the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0); // Last day of the month
  
    const totalDays = lastDay.getDate(); // Total number of days in the current month
    const firstDayOfWeek = firstDay.getDay(); // Day of the week the month starts on (0-6)
  
    // Clear the previous content
    calendarContainer.innerHTML = '';
  
    // Create day labels (Sun, Mon, Tue, ...)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      const dayLabel = document.createElement('div');
      dayLabel.className = 'day';
      dayLabel.textContent = day;
      calendarContainer.appendChild(dayLabel);
    });
  
    // Add empty slots for the leading empty days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptySlot = document.createElement('div');
      emptySlot.className = 'day';
      calendarContainer.appendChild(emptySlot);
    }
  
    // Add the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      const day = document.createElement('div');
      day.className = 'day';
      day.textContent = i;
  
      // Check if the day is in the attendance array and color it
      const currentDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const attendance = userDetails.attendance.find(entry => entry.date === currentDate);
  
      if (attendance && attendance.value === 1) {
        day.classList.add('attended'); // Color the day if attended
      }
  
      calendarContainer.appendChild(day);
    }
  };
  
  // Run the calendar rendering function when the page loads
  renderAttendanceCalendar();
  renderRegularCalendar();

// console.log(userDetails);
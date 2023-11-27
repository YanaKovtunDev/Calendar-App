import { Route, Routes } from 'react-router';

import { MonthViewPage } from './pages/MonthView.jsx';
import { DayViewPage } from './pages/DayView.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MonthViewPage />} />
      <Route path='/calendar/:date' element={<DayViewPage />} />
    </Routes>
  );
}

export default App;

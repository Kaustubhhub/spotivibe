export const fetchRooms = async () => {
    // Simulated data or database fetch logic
    return [{ id: 1, name: 'Room A' }, { id: 2, name: 'Room B' }];
  };
  
  export const createNewRoom = async (data: { name: string }) => {
    // Simulated room creation logic
    return { id: Date.now(), ...data };
  };
  

//beeper interface model
export interface Beeper {
    id: number;
    status: 'manufactured' | 'assembled' | 'shipped' | 'deployed' | 'detonated';
    created_at: Date;
    detonated_at?: Date;
    latitude?: number;
    longitude?: number;
  }
  



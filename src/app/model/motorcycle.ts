export interface Motorcycle {
  id: string;
  bikeId?: number;
  make: string;
  model: string;
  year: number;
  nickname?: string;
  isPrimary?: boolean;
}

export const MOTORCYCLE_MAKES: Record<string, string[]> = {
  Honda: ['CBR600RR', 'CB500F', 'Africa Twin', 'NC750X', 'CB1000R'],
  Yamaha: ['MT-07', 'R1', 'Tracer 9', 'XSR700', 'Ténéré 700'],
  Kawasaki: ['Ninja 650', 'Z900', 'Versys 650', 'Ninja H2', 'Vulcan S'],
  Suzuki: ['GSX-R750', 'SV650', 'V-Strom 650', 'Hayabusa', 'Katana'],
  BMW: ['R1250GS', 'S1000RR', 'F900R', 'R nineT', 'F850GS'],
  Ducati: ['Panigale V4', 'Monster', 'Multistrada V4', 'Scrambler', 'Diavel'],
  KTM: ['Duke 390', '1290 Super Duke', 'Adventure 890', 'RC 390', 'Duke 790'],
  Triumph: ['Street Triple', 'Tiger 900', 'Bonneville T120', 'Speed Triple', 'Trident 660'],
};

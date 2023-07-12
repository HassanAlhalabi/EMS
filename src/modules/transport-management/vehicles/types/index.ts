

export interface VehicleDropDown {vehicleId: string, vehicleBrand: string, vehiclePlate: string}

export interface Vehicle {
    vehicleId: string,
    vehicleBrand: string,
    vehiclePlate: string,
    vehicleCapacity: number,
    endClassChairCount: number
} 

export interface NewVehicle {
    vehicleBrand: string,
    vehiclePlate: string,
    vehicleCapacity: number,
    endClassChairCount:number
}
export type UserType = {
    idusuario: string;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    role: string;
};
  
export type HotelType = {
    _id: number; // Opcional porque es autoincremental
    idsede: number;
    idempresa: number;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    price_per_day: number;
    starrating: number;
    facilities: string[];
    asistentes: number;
    visitantes: number;
    image_urls: string[];
    iddireccion: number;
    tipo_via_principal: string;
    via_principal: string;
    via_secundaria: string;
    complemento: string;
};

export type BookingType = {
    idreserva: number;
    idusuario: number;
    idsede: number;
    fecha_inicio: string;
    fecha_fin: string;
    precio: number;
    name: string;
    iddireccion: number;
    city: string;
    country: string;
    image_urls: string[];
    tipo_via_principal: string;
    via_principal: string;
    via_secundaria: string;
    complemento: string;
    tipo: string;
};

export type SedeType = {
    idSede: number;
    idEmpresa: number;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    price_per_day: number;
    starRating: number;
    facilities: string[];
    asistentes: number;
    visitantes: number;
    imageUrls: string[];
    tipo_via_principal: string;
    via_principal: string;
    via_secundaria: string;
    complemento: string;
};

export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
};
  
export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalCost: number;
};
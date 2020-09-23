import { Service, PersonDto, CoupleDto } from "./Interfaces";
import { InMemoryCoupleDto, InMemoryPersonDto } from "./DTO";
import AskForNextInput from "./CommandLineRunner";

import ServiceImpl from "./Services/Service";

//Creating DTO Objects
//Currently using In memory dto, can be swapped with a database dto.
const inMemoryPersonDto: PersonDto = new InMemoryPersonDto();
const inMemoryCoupleDto: CoupleDto = new InMemoryCoupleDto();

//Create the service for handling queries
const service: Service = new ServiceImpl(inMemoryPersonDto, inMemoryCoupleDto);

AskForNextInput(service);

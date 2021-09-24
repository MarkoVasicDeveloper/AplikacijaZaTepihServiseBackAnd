/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarpetReception } from "entities/CarpetReception";
import { AddCarpetReceptionDto } from "dto/CarpetReception/add.carpet.reception.dto";
import { Clients } from "entities/Clients";
import { ApiResponse } from "src/misc/api.restonse";
import { Repository } from "typeorm";
import { EditCarpetReception } from "dto/CarpetReception/edit.carpet.reception.dto";

@Injectable()

export class CarpetReceptionsService {
    constructor(@InjectRepository(CarpetReception) private readonly carpetReception: Repository<CarpetReception>,
                @InjectRepository(Clients) private readonly clientsService: Repository<Clients>) {}

    async addCarpetReception (data: AddCarpetReceptionDto): Promise <Clients | ApiResponse> {
        const client = await this.clientsService.findOne(data.clientsId)

        if (!client) {
            return new ApiResponse('error', -4001, 'Client is not found')
        }

        const carpet = new CarpetReception();
        carpet.numberOfCarpet = data.numberOfCarpet;
        carpet.numberOfTracks = data.numberOfTracks;
        carpet.note = data.note;
        carpet.clientsId = client.clientsId;

        await this.carpetReception.save(carpet) 

        return await this.clientsService.findOne(client.clientsId, {
            relations: ['carpetReceptions', 'carpetReceptions.carpetImages']
        })
    }

    async editCarpetReception (data: EditCarpetReception): Promise <CarpetReception | ApiResponse> {
        const carpetReception = await this.carpetReception.findOne(data.carpetReceptionId)

        if (!carpetReception) {
            return new ApiResponse('error', -5001, 'Reception is not found')
        }

        if(data.numberOfCarpet) {
            carpetReception.numberOfCarpet = data.numberOfCarpet;
        }

        if(data.numberOfTracks) {
            carpetReception.numberOfTracks = data.numberOfTracks;
        }

        if(data.note) {
            carpetReception.note = data.note;
        }

        const editCarpetReception = await this.carpetReception.save(carpetReception)

        return editCarpetReception;
    }
}
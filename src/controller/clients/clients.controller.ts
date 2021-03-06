/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AddClientsDto } from "dto/clients/add.clients.dto";
import { EditClientDto } from "dto/clients/edit.client.dto";
import { GetClientByAddressDto } from "dto/clients/get.client.by.address.dto";
import { GetClientByNameDto } from "dto/clients/get.client.by.name.dto";
import { GetClientBySurnameDto } from "dto/clients/get.client.by.surname.dto";
import { Clients } from "entities/Clients";
import { ApiResponse } from "src/misc/api.restonse";
import { RolleCheckerGard } from "src/rollecheckergard/rolle.checker.gatd";
import { ClientsService } from "src/services/clients/clients.service";

@Controller('api/clients')

export class ClientsContoller {
    constructor(private readonly clientService: ClientsService) { }

    @Post('addClient/:id')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user' , 'administrator'])
    async addClient(@Body() data: AddClientsDto, @Param('id') userId: number): Promise <Clients> {
        return await this.clientService.addClients(data, userId)
    }

    @Post('editClient/:id')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async editClient(@Body() data: EditClientDto, @Param('id') clientId: number): Promise <Clients | ApiResponse> {
        return await this.clientService.editClient(data, clientId)
    }

    @Post('getClientByNameSurnameAddress/:id')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async getClientByNameSurnameAddress(@Body() data: AddClientsDto, @Param('id') userId: number):Promise <Clients | ApiResponse>{
        return await this.clientService.getClientByNameSurnameAddress(data, userId);
    }

    @Get('getAllClients')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user', 'administrator'])
    async getAllClients ():Promise <Clients[]> {
        return await this.clientService.getAllClients()
    }

    @Get('getClientById/:id/:userId')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async getClientById (@Param('id') clientId: number, @Param('userId') userId: number):Promise <Clients | ApiResponse> {
        return await this.clientService.getClientById(clientId, userId)
    }

    @Post('getClientsByName')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async getClientByName (@Body() data: GetClientByNameDto):Promise <Clients | ApiResponse> {
        return await this.clientService.getClientByName(data)
    }

    @Post('getClientsBySurname')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async getClientsBySurname (@Body() data: GetClientBySurnameDto):Promise <Clients | ApiResponse> {
        return await this.clientService.getClientBySurname(data)
    }

    @Post('getClientsByAddress')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async getClientsByAddress (@Body() data: GetClientByAddressDto):Promise <Clients | ApiResponse> {
        return await this.clientService.getClientByAddress(data)
    }

    @Delete('deleteClient/:id')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async deleteClient (@Param('id') clientId: number):Promise<Clients | ApiResponse> {
        return await this.clientService.deleteClient(clientId)
    }

    @Delete('deleteAllClient')
    @UseGuards(RolleCheckerGard)
    @SetMetadata('allow_to_roles', ['user'])
    async deleteAllClient ():Promise<Clients[]> {
        return await this.clientService.deleteAllClients()
    }
}
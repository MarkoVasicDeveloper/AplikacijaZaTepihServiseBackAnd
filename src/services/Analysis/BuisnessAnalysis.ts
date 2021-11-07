/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carpet } from "entities/Carpet";
import { CarpetReception } from "entities/CarpetReception";
import { Clients } from "entities/Clients";
import { AnalysisInfo } from "src/misc/analysis.info";
import { LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";

@Injectable()

export class BuisnessAnalysis {
    constructor(@InjectRepository(Clients) private readonly clientsService: Repository<Clients>,
                @InjectRepository(CarpetReception) private readonly carpetReceptionService: Repository<CarpetReception>,
                @InjectRepository(Carpet) private readonly carpetService: Repository<Carpet>
    ) { }

    async getDailyReport():Promise<AnalysisInfo> {
        const date = new Date().toISOString().split('T')[0]
        
        const allClient = await this.clientsService.find({
            where: {
                timeAt: date
            }
        })

        const numberOfClients = allClient.length

        const allReceptions = await this.carpetReceptionService.find({
            where: {
                dateAt: new Date().toISOString().split('T')[0]
            }
        })
        
        let numberOfCarpet = 0;
        let numberOfTracks = 0;
        for (const carpet of allReceptions) {
            numberOfCarpet += Number(carpet.numberOfCarpet)
            numberOfTracks += Number(carpet.numberOfTracks)
        }

        const allCarpet = await this.carpetService.find({
            where: {
                timeAt: new Date().toISOString().split('T')[0]
            }
        })

        let surface = 0;
        let forPay = 0;

        for(const carpetPart of allCarpet) {
            surface += carpetPart.carpetSurface;
            forPay += carpetPart.forPayment
        }
        
        return new AnalysisInfo(
            numberOfClients,
            numberOfCarpet,
            numberOfTracks,
            surface,
            forPay
        )
    }

    async theWeeklyReport():Promise<AnalysisInfo> {
        const d = new Date();
        d.setDate(d.getDate()-7);
        
        const allClient = await this.clientsService.find({
            where: {
                timeAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        const numberOfClients = allClient.length

        const allReceptions = await this.carpetReceptionService.find({
            where: {
                dateAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        let numberOfCarpet = 0;
        let numberOfTracks = 0;
        for (const carpet of allReceptions) {
            numberOfCarpet += Number(carpet.numberOfCarpet)
            numberOfTracks += Number(carpet.numberOfTracks)
        }

        const allCarpet = await this.carpetService.find({
            where: {
                timeAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        let surface = 0;
        let forPay = 0;

        for(const carpetPart of allCarpet) {
            surface += carpetPart.carpetSurface;
            forPay += carpetPart.forPayment
        }
        
        return new AnalysisInfo(
            numberOfClients,
            numberOfCarpet,
            numberOfTracks,
            surface,
            forPay
        )
    }

    async theMontlyReport():Promise<AnalysisInfo> {
        const d = new Date();
        d.setDate(d.getDate()-30);
        
        const allClient = await this.clientsService.find({
            where: {
                timeAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        const numberOfClients = allClient.length

        const allReceptions = await this.carpetReceptionService.find({
            where: {
                dateAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        let numberOfCarpet = 0;
        let numberOfTracks = 0;
        for (const carpet of allReceptions) {
            numberOfCarpet += Number(carpet.numberOfCarpet)
            numberOfTracks += Number(carpet.numberOfTracks)
        }

        const allCarpet = await this.carpetService.find({
            where: {
                timeAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        let surface = 0;
        let forPay = 0;

        for(const carpetPart of allCarpet) {
            surface += carpetPart.carpetSurface;
            forPay += carpetPart.forPayment
        }
        
        return new AnalysisInfo(
            numberOfClients,
            numberOfCarpet,
            numberOfTracks,
            surface,
            forPay
        )
    }

    async theYearReport():Promise<AnalysisInfo> {
        const d = new Date();
        d.setDate(d.getDate()-365);
        
        const allClient = await this.clientsService.find({
            where: {
                timeAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        const numberOfClients = allClient.length

        const allReceptions = await this.carpetReceptionService.find({
            where: {
                dateAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        let numberOfCarpet = 0;
        let numberOfTracks = 0;
        for (const carpet of allReceptions) {
            numberOfCarpet += Number(carpet.numberOfCarpet)
            numberOfTracks += Number(carpet.numberOfTracks)
        }

        const allCarpet = await this.carpetService.find({
            where: {
                timeAt: MoreThan(d.toISOString().split('T')[0])
            }
        })

        let surface = 0;
        let forPay = 0;

        for(const carpetPart of allCarpet) {
            surface += carpetPart.carpetSurface;
            forPay += carpetPart.forPayment
        }
        
        return new AnalysisInfo(
            numberOfClients,
            numberOfCarpet,
            numberOfTracks,
            surface,
            forPay
        )
    }

    async lastSevenDayReport () {
        const d = new Date();
        d.setDate(d.getDate()-8);

        const allClient = await this.clientsService.find({
            where: {
                timeAt: MoreThan(d.toISOString().split('T')[0])
            },
            order: {
                timeAt: 'DESC'
            }
        })
        const dataLastDate = []
        d.setDate(d.getDate()+7)

        const timeAt = allClient.map(client => {
            return (client.timeAt)
        })

        for(const time of timeAt) {
            if(time === d.toISOString().split('T')[0]) {
                dataLastDate.push(time)
            }
        }

        const dataLastTwoDay = [];
        d.setDate(d.getDate()-1)
        
        for(const time of timeAt) {
            if(time === d.toISOString().split('T')[0]) {
                dataLastTwoDay.push(time)
            }
        }

        const dataLastTreeDay = [];
        d.setDate(d.getDate()-1)
        
        for(const time of timeAt) {
            if(time === d.toISOString().split('T')[0]) {
                dataLastTreeDay.push(time)
            }
        }

        const dataLastFourDay = [];
        d.setDate(d.getDate()-1)
        
        for(const time of timeAt) {
            if(time === d.toISOString().split('T')[0]) {
                dataLastFourDay.push(time)
            }
        }

        const dataLastFifthDay = [];
        d.setDate(d.getDate()-1)
        
        for(const time of timeAt) {
            if(time === d.toISOString().split('T')[0]) {
                dataLastFifthDay.push(time)
            }
        }

        const dataLastSixtDay = [];
        d.setDate(d.getDate()-1)
        
        for(const time of timeAt) {
            if(time === d.toISOString().split('T')[0]) {
                dataLastSixtDay.push(time)
            }
        }

        const dataLastSevenDay = [];
        d.setDate(d.getDate()-1)
        
        for(const time of timeAt) {
            if(time === d.toISOString().split('T')[0]) {
                dataLastSevenDay.push(time)
            }
        }

        const t = new Date();
        t.setDate(t.getDate()-8);

        const allReceptions = await this.carpetReceptionService.find({
            where: {
                dateAt: MoreThan(t.toISOString().split('T')[0])
            },
            order: {
                timeAt: 'DESC'
            }
        })

        const receptionLastDay = [];
        t.setDate(t.getDate()+7);
        for(const one of allReceptions) {
            if(one.dateAt === t.toISOString().split('T')[0]){
                receptionLastDay.push(one.numberOfCarpet + one.numberOfTracks)
            }
        }

        const receptionTwoDay = [];
        t.setDate(t.getDate()-1);
        for(const one of allReceptions) {
            if(one.dateAt === t.toISOString().split('T')[0]){
                receptionTwoDay.push(one.numberOfCarpet + one.numberOfTracks)
            }
        }

        const receptionTreeDay = [];
        t.setDate(t.getDate()-1);
        for(const one of allReceptions) {
            if(one.dateAt === t.toISOString().split('T')[0]){
                receptionTreeDay.push(one.numberOfCarpet + one.numberOfTracks)
            }
        }

        const receptionFourDay = [];
        t.setDate(t.getDate()-1);
        for(const one of allReceptions) {
            if(one.dateAt === t.toISOString().split('T')[0]){
                receptionFourDay.push(one.numberOfCarpet + one.numberOfTracks)
            }
        }

        const receptionFifthDay = [];
        t.setDate(t.getDate()-1);
        for(const one of allReceptions) {
            if(one.dateAt === t.toISOString().split('T')[0]){
                receptionFifthDay.push(one.numberOfCarpet + one.numberOfTracks)
            }
        }

        const receptionSixDay = [];
        t.setDate(t.getDate()-1);
        for(const one of allReceptions) {
            if(one.dateAt === t.toISOString().split('T')[0]){
                receptionSixDay.push(one.numberOfCarpet + one.numberOfTracks)
            }
        }

        const receptionSevenDay = [];
        t.setDate(t.getDate()-1);
        for(const one of allReceptions) {
            if(one.dateAt === t.toISOString().split('T')[0]){
                receptionSevenDay.push(one.numberOfCarpet + one.numberOfTracks)
            }
        }
        
        const dt = new Date();
        dt.setDate(dt.getDate()-8);

        const allCarpet = await this.carpetService.find({
            where: {
                timeAt: MoreThan(dt.toISOString().split('T')[0])
            },
            order: {
                timeAt: 'DESC'
            }
        })

        const carpetLastDayPay = [];
        const carpetLastDaySurface = [];
        dt.setDate(dt.getDate()+7);

        for(const one of allCarpet) {
            if(one.timeAt === dt.toISOString().split('T')[0]){
                carpetLastDayPay.push(one.forPayment)
                carpetLastDaySurface.push(one.carpetSurface)
            }
        }

        const carpetTwoDayPay = [];
        const carpetTwoDaySurface = [];
        dt.setDate(dt.getDate()-1);
        
        for(const one of allCarpet) {
            if(one.timeAt === dt.toISOString().split('T')[0]){
                carpetTwoDayPay.push(one.forPayment)
                carpetTwoDaySurface.push(one.carpetSurface)
            }
        }

        const carpetTreeDayPay = [];
        const carpetTreeDaySurface = [];
        dt.setDate(dt.getDate()-1);
        
        for(const one of allCarpet) {
            if(one.timeAt === dt.toISOString().split('T')[0]){
                carpetTreeDayPay.push(one.forPayment)
                carpetTreeDaySurface.push(one.carpetSurface)
            }
        }

        const carpetFourDayPay = [];
        const carpetFourDaySurface = [];
        dt.setDate(dt.getDate()-1);
        
        for(const one of allCarpet) {
            if(one.timeAt === dt.toISOString().split('T')[0]){
                carpetFourDayPay.push(one.forPayment)
                carpetFourDaySurface.push(one.carpetSurface)
            }
        }

        const carpetFifthDayPay = [];
        const carpetFifthDaySurface = [];
        dt.setDate(dt.getDate()-1);
        
        for(const one of allCarpet) {
            if(one.timeAt === dt.toISOString().split('T')[0]){
                carpetFifthDayPay.push(one.forPayment)
                carpetFifthDaySurface.push(one.carpetSurface)
            }
        }

        const carpetSixDayPay = [];
        const carpetSixDaySurface = [];
        dt.setDate(dt.getDate()-1);
        
        for(const one of allCarpet) {
            if(one.timeAt === dt.toISOString().split('T')[0]){
                carpetSixDayPay.push(one.forPayment)
                carpetSixDaySurface.push(one.carpetSurface)
            }
        }

        const carpetSevenDayPay = [];
        const carpetSevenDaySurface = [];
        dt.setDate(dt.getDate()-1);
        
        for(const one of allCarpet) {
            if(one.timeAt === dt.toISOString().split('T')[0]){
                carpetSevenDayPay.push(one.forPayment)
                carpetSevenDaySurface.push(one.carpetSurface)
            }
        }

        
        return [
            {
                'lastDayClients': dataLastDate.length, 
                'lastTwoDayClients': dataLastTwoDay.length,
                'lastTreeDayClients' : dataLastTreeDay.length,
                'lastFourDayClients': dataLastFourDay.length,
                'lastFifthDayClients': dataLastFifthDay.length,
                'lastSixtDayClients': dataLastSixtDay.length,
                'lastSevenDayClients': dataLastSevenDay.length
            },
            {
                'lastDayNumberOfCarpet' : receptionLastDay,
                'lastTwoDayNumberOfCarpet' : receptionTwoDay,
                'lastTreeDayNumberOfCarpet' : receptionTreeDay,
                'lastFourDayNumberOfCarpet' : receptionFourDay,
                'lastFiftDayNumberOfCarpet' : receptionFifthDay,
                'lastSixDayNumberOfCarpet' : receptionSixDay,
                'lastSevenDayNumberOfCarpet' : receptionSevenDay,
            },
            {
                'lastDaySurface' : carpetLastDaySurface,
                'lastTwoDaySurface' : carpetTwoDaySurface,
                'lastTreeDaySurface' : carpetTreeDaySurface,
                'lastFourDaySurface' : carpetFourDaySurface,
                'lastFifthDaySurface' : carpetFifthDaySurface,
                'lastSixDaySurface' : carpetSixDaySurface,
                'lastSevenDaySurface' : carpetSevenDaySurface,
            },
            {
                'lastDayPay' : carpetLastDayPay,
                'lastTwoDayPay' : carpetTwoDayPay,
                'lastTreeDayPay' : carpetTreeDayPay,
                'lastFourDayPay' : carpetFourDayPay,
                'lastFifthDayPay' : carpetFifthDayPay,
                'lastSixDayPay' : carpetSixDayPay,
                'lastSevenDayPay' : carpetSevenDayPay,
            }
        ]
    }

    async montryReport(data: string) {
        const d = new Date(data);
        d.setDate(d.getDate() - 30);// Return 30 days back in ISOstring format
        const dt = new Date(data);
        dt.setDate(dt.getDate())
        
        const allClient = await this.clientsService.find({
            where: {
                timeAt: MoreThanOrEqual(d.toISOString().split('T')[0]) && LessThanOrEqual(data)//d.toISOString().split('T')[0]
            }
        })

        function groupBy(objectArray: any[], property: string | number) {
            return objectArray.reduce(function (acc, obj) {
              const key = obj[property]
              if (!acc[key]) {
                acc[key] = []
              }
              acc[key].push(obj)
              return acc
            }, [])
          }

        const groupedPeople = groupBy(allClient, 'timeAt')

        const da = new Date(data);
        da.setDate(da.getDate() - 30);// Return 30 days back in ISOstring format

        const time = []

        function arrayOfDate(date, numberOfDays) {
            for(let i=0; i<numberOfDays; i++) {
                const da = new Date(date);
                da.setDate(da.getDate() - i)
                time.push(da.toISOString().split('T')[0])
            }
        }
        arrayOfDate(data, 30)

        const finallyArrClients = [];
        for (const timeDate of time){
            if(groupedPeople[timeDate]) {
                finallyArrClients.push({
                    time: timeDate,
                    number: groupedPeople[timeDate].length
                })
            }
            
        }
        
        const allReceptions = await this.carpetReceptionService.find({
            where: {
                timeAt: MoreThanOrEqual(d.toISOString().split('T')[0]) && LessThanOrEqual(data)//d.toISOString().split('T')[0]
            }
        })

        const groupedReception = groupBy(allReceptions, 'dateAt')

        const finallyArrReceptions = [];
        for (const timeDate of time){
            if(groupedReception[timeDate]) {
                let numberOfCarpet = 0;
                for(const reception of groupedReception[timeDate]){
                    numberOfCarpet += reception.numberOfCarpet + reception.numberOfTracks
                }
                finallyArrReceptions.push({
                    time: timeDate,
                    numberOfCarpet: numberOfCarpet
                })
            }
        }

        const allCarpet = await this.carpetService.find({
            where: {
                timeAt: MoreThanOrEqual(d.toISOString().split('T')[0]) && LessThanOrEqual(data)//d.toISOString().split('T')[0]
            }
        })

        const grupedCarpet = groupBy(allCarpet, 'timeAt')

        const finallyArrCarpetSurface = [];
        const finallyArrCarpetPay = [];
        for (const timeDate of time){
            if(grupedCarpet[timeDate]) {
                let surface = 0;
                let pay = 0;
                for(const carpet of grupedCarpet[timeDate]){
                    surface += carpet.carpetSurface;
                    pay += carpet.forPayment;
                }
                finallyArrCarpetSurface.push({
                    time: timeDate,
                    surface: surface
                })
                finallyArrCarpetPay.push({
                    time: timeDate,
                    pay: pay
                })
            }
        }

        console.log(finallyArrReceptions)

        return [
            {
                'Clients' : finallyArrClients
            },
            {
                'Carpet' : finallyArrReceptions
            },
            {
                'Surface' : finallyArrCarpetSurface
            },
            {
                'ForPayment' : finallyArrCarpetPay
            }
        ]
    }

    async yearReport() {
        //concatination all clients, carpet, surface and forPay and r3eturn for all monts
        const january = await this.montryReport('2021-1-31')
        const february = await this.montryReport('2021-2-28')
        const march = await this.montryReport('2021-3-31')
        const april = await this.montryReport('2021-4-30')
        const may = await this.montryReport('2021-5-31')
        const jun = await this.montryReport('2021-6-30')
        const july = await this.montryReport('2021-7-31')
        const august = await this.montryReport('2021-8-30')
        const september = await this.montryReport('2021-9-30')
        const october = await this.montryReport('2021-10-31')
        const november = await this.montryReport('2021-11-30')
        const december = await this.montryReport('2021-12-31')

        return [january, february, march, april, may, jun, july, august, september, october, november, december]
    }
}
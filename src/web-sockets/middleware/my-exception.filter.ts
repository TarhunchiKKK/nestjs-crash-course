import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, Injectable } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { Request, Response } from "express";

@Catch(WsException)
export class MyExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        super.catch(exception, host)
    }
}
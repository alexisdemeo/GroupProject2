import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import os

def lambda_handler(event, context):
    
    dynamodb = boto3.resource("dynamodb")
    
    table = dynamodb.Table('feedback')
    
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*",
    }

    try:
        response = table.scan()
    except ClientError as e:
        print(e.response['Error']['Message'])
    else: 
        items = response['Items']
        print(json.dumps(items))
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(items)
        }
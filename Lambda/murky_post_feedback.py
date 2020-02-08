import boto3
import json
import decimal
import datetime
import uuid

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if abs(o) % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-2')

table = dynamodb.Table('feedback')

def murky_post_feedback(event, context):
    
    """
    Add user feedback to database table
    """
    print("Printing event params: ")
    print(event)
    
    data = json.loads(event['body'])
    id = str(uuid.uuid1())
    
    t = datetime.datetime.now()
    timestamp = t.strftime('%d/%m/%Y')

    # Append additional values to JSON object
    data['id'] = id
    data['timestamp'] = timestamp

    table.put_item(
        Item = data
    )

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
        'body': json.dumps('Successful')
    }
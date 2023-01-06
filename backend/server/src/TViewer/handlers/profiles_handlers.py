from TViewer.models.configuration import Configuration
from TViewer.models.historical_data_inner import HistoricalDataInner
from TViewer.models.profiles_inner import ProfilesInner
from typing import List
import mysql.connector

from TViewer.passwords import DBUser


async def handle_get_profiles() -> list[ProfilesInner]:
    def get_users():
        mycursor.execute("SHOW DATABASES;")
        databases = mycursor.fetchall()
        return [user[0] for user in databases
                if user[0] not in ["information_schema", "mysql", "performance_schema", "sys"]]

    mydb = mysql.connector.connect(
        host=DBUser.host,
        port=DBUser.port,
        user=DBUser.user,
        password=DBUser.password,
    )
    mycursor = mydb.cursor()
    result = []
    for _user in get_users():
        mycursor.execute(f"USE {_user};")
        mycursor.execute("SHOW TABLES;")
        result.append(
            ProfilesInner(
                name=_user, indicators=[table[0] for table in mycursor.fetchall()
                                        if table[0] not in ["Configuration"]])
        )
    return result


async def handle_profiles_name_configuration_get(
        profile_name: str) -> Configuration:
    pass


async def handle_profiles_name_historical_data_get(
        profile_name: str, indicator: str, timeframe: int) -> List[HistoricalDataInner]:

    mydb = mysql.connector.connect(
        host=DBUser.host,
        port=DBUser.port,
        user=DBUser.user,
        password=DBUser.password,
        database=profile_name
    )
    mycursor = mydb.cursor()
    mycursor.execute(f"""
        SELECT t.grp_id as `grp_id`,
           t.min_value,
           t.max_value,
           indicator_min.value `first_value`,
           indicator_max.value `last_value`
        FROM (
            SELECT FROM_UNIXTIME({timeframe}*60*(UNIX_TIMESTAMP(`Time`) DIV ({timeframe}*60))) grp_id,
                     MIN(`Value`) as min_value,
                     MAX(`Value`) as max_value,
                     MIN(`Time`) as min_created,
                     MAX(`Time`) as max_created
                    FROM `{indicator}`
                    GROUP BY grp_id
        ) t JOIN `{indicator}` indicator_min ON indicator_min.`Time` = t.min_created
            JOIN `{indicator}` indicator_max ON indicator_max.`Time` = t.max_created
            GROUP BY t.grp_id
            ORDER BY grp_id ASC;
        """)

    return [HistoricalDataInner(
                time=i[0],
                open=i[3],
                high=i[2],
                low=i[1],
                close=i[4]
            ) for i in mycursor.fetchall()]

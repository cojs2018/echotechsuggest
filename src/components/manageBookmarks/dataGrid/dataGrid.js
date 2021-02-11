import React from 'react';
import { DataTable, Headline } from 'react-native-paper';
import { View, Image } from 'react-native';
import HeaderRow from './headerRow/headerRow';
import Row from './rows/row';
import { listBookmarks } from '../../../utils/storage';
import LoadingView from 'react-native-loading-view';

export default function DataGrid() {
    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');

    const handleTableData = async () => {
        setIsLoading(true);
        return listBookmarks()
            .then(listOfArticles => {
                setRows(listOfArticles);
                setIsLoading(false);
            })
            .catch((onError) => {
                setIsError(true);
                setIsLoading(false);
                setErrorText(onError);
            });
    };

    React.useEffect(() => {
        handleTableData();
    }, []);

    const [tablePage, setTablePage] = React.useState(0);
    const pageFrom = tablePage * 10;
    const pageTo = 10 > 0 ? ((tablePage + 1) * 10) : (rows.length);
    const numberOfPages = 10 > 0 ? (Math.floor(rows.length / 10)) : (1);

    const label = `${pageFrom + 1}-${pageTo} of ${rows.length}`;
    const handlePageChange = (pageNumber) => setTablePage(pageNumber);
    
    return (
        isLoading ? (
            <View>
                <LoadingView loading={isLoading} />
            </View>
        ) : (
            <View>
                {isError ? (
                    <View>
                        <Image source={require('../../../images/noBookmarks.png')} />
                        <Headline>{errorText}</Headline>
                    </View>
                ) : (
                    <DataTable >
                        <HeaderRow />
                        {rows.map(rowData => {
                            <Row 
                                rowId={rowData.bookmarkId}
                                rowData={rowData}
                            />
                        })}
                        <DataTable.Pagination
                            page={tablePage}
                            numberOfPages={numberOfPages}
                            onPageChange={handlePageChange}
                            label={label}
                        />
                    </DataTable>
                )}
            </View>
        )
    );       
}